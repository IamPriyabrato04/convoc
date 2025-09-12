# 🎙️ convoc.live Demo  -> https://convoc.live

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)](https://nextjs.org/)
[![LiveKit](https://img.shields.io/badge/LiveKit-SFU-blue?logo=webrtc)](https://livekit.io/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)](https://www.docker.com/)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-orange.svg)](../../issues)
[![GitHub stars](https://img.shields.io/github/stars/IamPriyabrato04/convoc?style=social)](https://github.com/IamPriyabrato04/convoc/stargazers)

🔗 Live Demo: [convoc.live](https://convoc.live)  

> 💡 **Pro Tip**: Replace this placeholder image with a high-quality screenshot or an animated GIF of your application in action!  

---

## 🚀 About The Project  

**Convoc** is a real-time, browser-based video conferencing application that allows users to create and join secure meeting rooms for seamless video and audio communication.  

Built with a modern, scalable tech stack, it provides a **fast, reliable, and user-friendly platform** for virtual collaboration.  

This project leverages the power of a **self-hosted LiveKit SFU on Google Cloud Platform (GCP)** for efficient, low-latency media streams and **Auth.js v5** for secure authentication.  

It was built to demonstrate proficiency in handling **real-time data**, managing **modern frontend architecture**, and deploying **scalable, containerized applications** on the cloud.  

---

## ✨ Key Features  

- 🔐 **Secure OAuth Login** – Authenticate easily using your Google or GitHub account.  
- ⚡ **Instant Room Creation** – Generate a unique, secure meeting room with one click.  
- 🎥 **High-Quality Video & Audio** – Low-latency communication powered by a self-hosted LiveKit SFU on GCP.  
- 🎛️ **In-Meeting Controls** – Mute/unmute microphone and toggle camera with ease.  
- 🖥️ **Screen Sharing** – Share entire screen, specific window, or browser tab.  
- 💬 **Live Chat** – Built-in text chat during the call.  
- 📱 **Responsive Design** – Works seamlessly across all devices.  

---

## 🛠️ Tech Stack  

**Frontend**  
- [Next.js](https://nextjs.org/) – React framework for production apps  
- [shadcn/ui](https://ui.shadcn.com/) – UI components built with Radix UI & Tailwind  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling  

**Backend & Real-Time Communication**  
- [LiveKit](https://livekit.io/) – Open-source WebRTC SFU  
- LiveKit Token Server – Secure token generation  

**Authentication**  
- [Auth.js v5](https://authjs.dev/) – Google & GitHub OAuth  

**Deployment & Infrastructure**  
- [Docker](https://www.docker.com/) – Containerization  
- [Google Cloud Run](https://cloud.google.com/run) – Deploying and scaling apps  
- [Google Cloud Platform (GCP)](https://cloud.google.com/) – Hosting LiveKit SFU  
- [Google Load Balancer](https://cloud.google.com/load-balancing) – HTTPS/SSL traffic management  

---

## ⚙️ Getting Started  

### Prerequisites  
Make sure you have the following installed:  
- [Node.js](https://nodejs.org/) (includes npm)  
- [Git](https://git-scm.com/)  

---

### 🔧 Installation & Setup  

#### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/IamPriyabrato04/convoc.git
cd convoc
```

#### 2️⃣ Set Up the Token Server (Backend)
```bash
cd server
npm install
```
  ### Run the backend:
  ```bash
  npm start
  ```

#### 3️⃣ Set Up the Main Application (Frontend)

### Open a new terminal: 
```bash
cd client
npm install
```

### Create a .env.local file in the client directory:
```bash
# LiveKit URL
NEXT_PUBLIC_LIVEKIT_URL="YOUR_LIVEKIT_SERVER_URL"

# Auth.js Credentials
AUTH_GOOGLE_ID="YOUR_GOOGLE_CLIENT_ID"
AUTH_GOOGLE_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
AUTH_GITHUB_ID="YOUR_GITHUB_CLIENT_ID"
AUTH_GITHUB_SECRET="YOUR_GITHUB_CLIENT_SECRET"

# A secret key for Auth.js
AUTH_SECRET="GENERATE_A_RANDOM_SECRET_KEY"
```
  ### 💡 Generate a random secret key using:
  ``` bash
  openssl rand -base64 32
  ```

#### Start the frontend:
```bash
npm run dev
```

### Now open: http://localhost:3000 🎉


---


## 🤝 Contributing

- Contributions are what make the open-source community amazing. Any contributions are greatly appreciated.

- ### 1. Fork the project

- ### 2. Create your feature branch
  ```bash
  git checkout -b feature/AmazingFeature
  ```

- ### 3. Commit changes
  ```bash
    git commit -m 'Add some AmazingFeature'
  ```

- ### 4. Push to the branch
  ```bash
    git push origin feature/AmazingFeature
  ```

- ### 5. Open a Pull Request

---

