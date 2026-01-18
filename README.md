<h1 align="center">💼 CareerSense — ML-Powered Salary Prediction Platform</h1>
<br />
<a href="https://career-sense-b8ah.vercel.app/" target="_blank">🔗 Live Demo</a>
</h1>

<p align="center">
  <b>Machine Learning • Real-World Inference • Production-Ready • Clean Architecture</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success" />
  <img src="https://img.shields.io/badge/ML-TensorFlow-orange" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-green" />
  <img src="https://img.shields.io/badge/Frontend-Next.js-blue" />
  <img src="https://img.shields.io/badge/Deployment-Render-purple" />
</p>

<p align="center">
  <img src="/frontend/public/screenshot-for-readme.png" alt="CareerSense Demo" />
</p>

---

## 🚀 About the Project

**CareerSense** is a machine learning–driven salary prediction platform designed to demonstrate  
**end-to-end ML system design**, from feature engineering and model training to deployment and real-time inference.

The project focuses on **production correctness**, **clean ML pipelines**, and **real-world constraints** such as cold starts, schema validation, and feature consistency between training and inference.

---

## 🎯 What Problem It Solves

- Predicts **annual salary** based on professional profile data
- Handles **mixed data types** (numeric, categorical, text)
- Ensures **training–inference parity**
- Exposes predictions via a **scalable API**
- Demonstrates real-world ML deployment challenges & solutions

---

## ✨ Key Features

- 🧠 **Neural Network Salary Prediction (ANN)**
- 🧩 Robust **Feature Engineering Pipeline**
- 📊 Numerical + Categorical + Text Feature Handling
- 🔁 Training & Inference Feature Alignment
- ⚖️ Scaler Reuse for Consistent Predictions
- 🚀 FastAPI-based Production Inference
- 🌐 Direct Frontend → Backend Integration
- 💤 Backend Warmup for Cold Start Reduction
- 🔒 Strict Request Validation with Pydantic
- 🧱 Modular ML Codebase
- 🧪 Debuggable & Observable Inference Flow

---

## 🧠 Machine Learning Overview

### Input Features
- Rating
- Years of Experience
- Employment Status
- Location
- Company Size
- Job Role
- Skills (text-based)

### ML Pipeline
1. **Data Cleaning & Normalization**
2. **Feature Engineering**
   - One-hot encoding for categoricals
   - Numerical scaling
   - Skill text processing
3. **Model Training**
   - Artificial Neural Network (TensorFlow / Keras)
4. **Inference Pipeline**
   - Feature alignment using saved columns
   - Scaler reuse
   - Stateless predictions
5. **Deployment**
   - Model loaded once at startup
   - FastAPI serving predictions

---






