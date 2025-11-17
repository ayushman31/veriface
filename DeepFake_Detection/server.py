from flask import Flask, render_template, redirect, request, url_for, send_file
from flask import jsonify, json
from flask_cors import CORS
from werkzeug.utils import secure_filename

# Interaction with the OS
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

# Used for DL applications, computer vision related processes
import torch
import torchvision

# For image preprocessing
from torchvision import transforms

# Combines dataset & sampler to provide iterable over the dataset
from torch.utils.data import DataLoader
from torch.utils.data.dataset import Dataset

import numpy as np
import cv2

# To recognise face from extracted frames
import face_recognition

# Autograd: PyTorch package for differentiation of all operations on Tensors
# Variable are wrappers around Tensors that allow easy automatic differentiation
from torch.autograd import Variable

import time

import sys

# 'nn' Help us in creating & training of neural network
from torch import nn

# Contains definition for models for addressing different tasks i.e. image classification, object detection e.t.c.
from torchvision import models

from skimage import img_as_ubyte
import warnings
warnings.filterwarnings("ignore")

UPLOAD_FOLDER = 'Uploaded_Files'
video_path = ""

detectOutput = []

app = Flask("__main__", template_folder="templates")
CORS(app)  
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Creating Model Architecture

class Model(nn.Module):
  def __init__(self, num_classes, latent_dim= 2048, lstm_layers=1, hidden_dim=2048, bidirectional=False):
    super(Model, self).__init__()

    # returns a model pretrained on ImageNet dataset
    model = models.resnext50_32x4d(pretrained= True)

    # Sequential allows us to compose modules nn together
    self.model = nn.Sequential(*list(model.children())[:-2])

    # RNN to an input sequence
    self.lstm = nn.LSTM(latent_dim, hidden_dim, lstm_layers, bidirectional)

    # Activation function
    self.relu = nn.LeakyReLU()

    # Dropping out units (hidden & visible) from NN, to avoid overfitting
    self.dp = nn.Dropout(0.4)

    # A module that creates single layer feed forward network with n inputs and m outputs
    self.linear1 = nn.Linear(2048, num_classes)

    # Applies 2D average adaptive pooling over an input signal composed of several input planes
    self.avgpool = nn.AdaptiveAvgPool2d(1)



  def forward(self, x):
    batch_size, seq_length, c, h, w = x.shape

    # new view of array with same data
    x = x.view(batch_size*seq_length, c, h, w)

    fmap = self.model(x)
    x = self.avgpool(fmap)
    x = x.view(batch_size, seq_length, 2048)
    x_lstm,_ = self.lstm(x, None)
    return fmap, self.dp(self.linear1(x_lstm[:,-1,:]))




im_size = 112

# std is used in conjunction with mean to summarize continuous data
mean = [0.485, 0.456, 0.406]

# provides the measure of dispersion of image grey level intensities
std = [0.229, 0.224, 0.225]

# Often used as the last layer of a nn to produce the final output
sm = nn.Softmax()

# Normalising our dataset using mean and std
inv_normalize = transforms.Normalize(mean=-1*np.divide(mean, std), std=np.divide([1,1,1], std))

# For image manipulation
def im_convert(tensor):
  image = tensor.to("cpu").clone().detach()
  image = image.squeeze()
  image = inv_normalize(image)
  image = image.numpy()
  image = image.transpose(1,2,0)
  image = image.clip(0,1)
  cv2.imwrite('./2.png', image*255)
  return image

# For prediction of output  
def predict(model, img, path='./'):
  # use this command for gpu    
  # fmap, logits = model(img.to('cuda'))
  fmap, logits = model(img.to())
  params = list(model.parameters())
  weight_softmax = model.linear1.weight.detach().cpu().numpy()
  logits = sm(logits)
  _, prediction = torch.max(logits, 1)
  confidence = logits[:, int(prediction.item())].item()*100
  print('confidence of prediction: ', logits[:, int(prediction.item())].item()*100)
  return [int(prediction.item()), confidence]


# To validate the dataset
class validation_dataset(Dataset):
  def __init__(self, video_names, sequence_length = 60, transform=None):
    self.video_names = video_names
    self.transform = transform
    self.count = sequence_length

  # To get number of videos
  def __len__(self):
    return len(self.video_names)

  # To get number of frames
  def __getitem__(self, idx):
    video_path = self.video_names[idx]
    frames = []
    a = int(100 / self.count)
    first_frame = np.random.randint(0,a)
    for i, frame in enumerate(self.frame_extract(video_path)):
      faces = face_recognition.face_locations(frame)
      try:
        top,right,bottom,left = faces[0]
        frame = frame[top:bottom, left:right, :]
      except:
        pass
      frames.append(self.transform(frame))
      if(len(frames) == self.count):
        break
    frames = torch.stack(frames)
    frames = frames[:self.count]
    return frames.unsqueeze(0)

  # To extract number of frames
  def frame_extract(self, path):
    vidObj = cv2.VideoCapture(path)
    success = 1
    while success:
      success, image = vidObj.read()
      if success:
        yield image

import base64

def detectFakeVideo(videoPath):
    # transform
    im_size = 112
    mean = [0.485, 0.456, 0.406]
    std = [0.229, 0.224, 0.225]

    train_transforms = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((im_size, im_size)),
        transforms.ToTensor(),
        transforms.Normalize(mean, std)
    ])

    # Dataset
    video_dataset = validation_dataset([videoPath], sequence_length=20, transform=train_transforms)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = Model(2).to(device)
    model.load_state_dict(torch.load('model/best_model.pth', map_location=device))
    model.eval()

    # original prediction
    prediction = predict(model, video_dataset[0])
    is_fake = prediction[0] == 0  # 0 = fake

    # return early if REAL
    if not is_fake:
        return {
            'prediction': prediction[0],
            'confidence': prediction[1],
            'highlighted_frames': None,
        }

    # ------------------------------------------------------
    # SAMPLE 24 FRAMES EVENLY ACROSS VIDEO (FAST)
    # ------------------------------------------------------
    TOTAL_FRAMES_TO_ANALYZE = 30
    cap = cv2.VideoCapture(videoPath)
    video_total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    # Evenly spaced frame indices
    sample_positions = np.linspace(0, video_total_frames - 1, TOTAL_FRAMES_TO_ANALYZE).astype(int)

    frames = []
    frame_probs = []

    for pos in sample_positions:
        cap.set(cv2.CAP_PROP_POS_FRAMES, pos)
        ret, frame = cap.read()
        if not ret:
            continue

        frames.append(frame)

        # Face crop (if face available)
        faces = face_recognition.face_locations(frame)
        try:
            top, right, bottom, left = faces[0]
            face_crop = frame[top:bottom, left:right]
        except:
            face_crop = frame

        # preprocessing
        img = train_transforms(face_crop).unsqueeze(0).unsqueeze(0).to(device)

        # forward pass
        fmap, logits = model(img)
        prob_fake = sm(logits)[0][0].item()
        frame_probs.append(prob_fake)

    cap.release()

    # ------------------------------------------------------
    # SELECT TOP 10 FAKE FRAMES
    # ------------------------------------------------------
    top_k = 10

    # Sort indices by highest fake probability
    indices_sorted = np.argsort(frame_probs)[::-1]
    chosen_indices = indices_sorted[:top_k]

    encoded_frames = []

    for idx in chosen_indices:
        frame = frames[idx].copy()

        # Draw facial landmarks
        faces = face_recognition.face_locations(frame)
        for (top, right, bottom, left) in faces:
          cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Encode frame to base64
        _, buffer = cv2.imencode(".jpg", frame)
        frame_b64 = base64.b64encode(buffer).decode()

        encoded_frames.append({
            "frame_index": int(sample_positions[idx]),
            "image": frame_b64
        })

    # ------------------------------------------------------
    # RETURN FINAL RESULT
    # ------------------------------------------------------
    return {
        'prediction': prediction[0],
        'confidence': prediction[1],
        'highlighted_frames': encoded_frames
    }

# API endpoint for react frontend
@app.route('/api/detect', methods=['POST'])
def api_detect():
    try:
        if 'video' not in request.files:
            return jsonify({'error': 'No video file provided'}), 400
        
        video = request.files['video']
        if video.filename == '':
            return jsonify({'error': 'No video file selected'}), 400
        
        video_filename = secure_filename(video.filename)
        video.save(os.path.join(app.config['UPLOAD_FOLDER'], video_filename))
        video_path = "Uploaded_Files/" + video_filename
        
        result = detectFakeVideo(video_path)

        output = "REAL" if result['prediction'] == 1 else "FAKE"
        confidence = result['confidence']

        os.remove(video_path)

        return jsonify({
            'output': output,
            'confidence': confidence,
            'highlighted_frames': result['highlighted_frames'],       # NEW
            'success': True
        })
        
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500


app.run(port=3000, debug=True);