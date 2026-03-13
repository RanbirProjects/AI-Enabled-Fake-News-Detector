<h1 align="center">🧠 AI-Enabled Fake News Detector</h1>

<p align="center">
A modern web application that detects fake news using rule-based algorithms and provides a confidence score with detailed analysis.
</p>

<p align="center">

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow)

</p>

---

# 🎥 Demo Preview

<p align="center">
<img src="https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif" width="600"/>
</p>

---

# 📑 Table of Contents

- 🚀 Features
- 🛠 Tech Stack
- 📂 Project Structure
- ⚙ Installation
- ▶ Running Locally
- 🌐 Deployment
- 📊 How It Works
- 👨‍💻 Author

---

# 🚀 Features

✨ Detect fake news from **Text, URL, or Title**

📊 **Confidence score visualization**

🧠 Rule-based **content analysis**

📜 Detailed explanation of detection results

🕘 History tracking of previous checks

📱 Fully responsive design

💾 MongoDB database with **in-memory fallback**

---

# 🛠 Tech Stack

## Frontend

- ⚛ React.js
- 🔗 Axios
- 🎨 CSS animations
- 🧩 SVG icons & patterns

## Backend

- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB + Mongoose
- 🧠 Rule-based detection algorithm

---

# 📂 Project Structure

```bash
fake-news-detector/
│
├── client/                # React frontend
│   │
│   ├── public/
│   │   ├── index.html
│   │   └── _redirects
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   │
│   └── netlify.toml       # Netlify configuration
│
├── server/                # Express backend
│   │
│   ├── models/
│   │   └── NewsCheck.js
│   │
│   ├── routes/
│   │   └── detector.js
│   │
│   └── index.js
│
├── README.md
└── package.json
```

---

# ⚙ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/fake-news-detector.git
cd fake-news-detector
```

---

# ▶ Running Locally

## Start Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Start Frontend

```bash
cd client
npm install
npm start
```

Open:

```
http://localhost:3000
```

---

# 🌐 Deployment

## Frontend Deployment (Netlify)

1️⃣ Push code to GitHub  
2️⃣ Login to Netlify  
3️⃣ Select **New site from Git**

### Build settings

```
Base directory: client
Build command: npm run build
Publish directory: build
```

---

## Backend Deployment

You can deploy backend on:

- Render
- Railway
- Heroku
- AWS EC2

### Environment Variable

```
MONGO_URI = your_mongodb_connection_string
```

---

# 📊 How Detection Works

The fake news detector analyzes:

✔ Suspicious keywords  
✔ Source credibility  
✔ Text sentiment  
✔ Headline patterns  
✔ Content reliability

The algorithm then calculates a **confidence score** representing the probability of fake news.

---

# 🧪 Example Detection Result

```
Input:
"Breaking: Celebrity discovered secret cure for cancer!"

Output:
⚠ Likely Fake News
Confidence Score: 82%
Reason:
- Sensational language detected
- Unverified claim
- Suspicious headline structure
```

---

# 👨‍💻 Author

**Ranbir Singh**

💻 GitHub  
https://github.com/RanbirProjects

🔗 LinkedIn  
https://www.linkedin.com/in/ranbirsingh1001/

🧠 LeetCode  
https://leetcode.com/u/ranbirsingh7/

---

# ⭐ Support

If you found this project useful, please **star the repository ⭐**

It helps others discover it!

---

<p align="center">
🧠 Built with MERN Stack & Curiosity
</p>
