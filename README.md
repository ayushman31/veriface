# DeepFake Detection Web Application

A DeepFake detection web application built using Deep Learning (ResNeXt + LSTM), Flask, and ReactJS.
The system predicts whether an uploaded video is REAL or FAKE, provides a confidence score,
and includes frame-level analysis for better interpretability.

---------------------------------------------------------------

PROJECT OVERVIEW

This project detects DeepFake videos by learning both spatial and temporal patterns from video data.

- ResNeXt is used to extract spatial features from individual frames
- LSTM models temporal dependencies across consecutive frames
- Face detection is performed using the face_recognition library
- Flask is used to build the backend API
- A fully redesigned ReactJS frontend enables interactive video upload and result visualization

----------------------------------------------------------------

TECH STACK

Backend:
- Python
- Flask
- PyTorch
- OpenCV
- face_recognition

Frontend:
- ReactJS
- HTML
- CSS
- JavaScript

Deep Learning:
- ResNeXt (CNN)
- LSTM (Temporal modeling)

Dataset:
- Celeb-DF (DeepFake Forensics)
- https://github.com/yuezunli/celeb-deepfakeforensics

----------------------------------------------------------------

KEY FEATURES

- Video upload for DeepFake detection
- Deep learning based REAL / FAKE classification
- Confidence score for predictions
- Frame-level analysis for improved transparency
- Face detection using face_recognition
- Completely redesigned React frontend

----------------------------------------------------------------

SETUP INSTRUCTIONS

1. Clone the repository
git clone <your-repository-url>
cd DeepFake_Detection

2. Create required folders
Inside the DeepFake_Detection directory:
- Uploaded_Files/
- model/ (place trained model files here)

These paths are already configured in server.py.

3. Install backend dependencies
pip install -r requirements.txt

4. Run the Flask server
python server.py

5. Run the frontend
cd frontend
npm install
npm start

----------------------------------------------------------------

MODEL PERFORMANCE

- Accuracy: (add your achieved accuracy): 98.7%
- Confusion Matrix
  <img width="531" height="356" alt="image" src="https://github.com/user-attachments/assets/da1e3f47-8550-4ef5-a477-04cb90f55679" />


----------------------------------------------------------------

DATASET DETAILS

The model is trained using the Celeb-DF dataset which contains real and DeepFake videos
generated using multiple DeepFake techniques.

Dataset link:
https://github.com/yuezunli/celeb-deepfakeforensics

----------------------------------------------------------------

ACKNOWLEDGEMENTS AND CREDITS

This project is inspired by and built with reference to existing open-source work.
We sincerely thank the original authors for making their implementations publicly available.

References:

Deepfake Detection using Deep Learning:
https://github.com/abhijitjadhav1998/Deepfake_detection_using_deep_learning

Original Project Inspiration:
https://github.com/iamdhrutipatel/DeepFake-Detection

This repository includes:
- A completely redesigned frontend
- Modified backend and API integration
- Frame-level prediction and analysis features
- Custom project structure and deployment setup


----------------------------------------------------------------

DISCLAIMER

This project is intended strictly for educational and research purposes.
DeepFake detection remains an open research challenge and real-world performance may vary.
