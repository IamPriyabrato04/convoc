🎙️ Convoc
Live Demo: convoc.live
(Pro Tip: Replace this placeholder image with a high-quality screenshot or an animated GIF of your application in action!)
🚀 About The Project
Convoc is a real-time, browser-based video conferencing application that allows users to create and join secure meeting rooms for seamless video and audio communication. Built with a modern, scalable tech stack, it provides a fast, reliable, and user-friendly platform for virtual collaboration.
This project leverages the power of a self-hosted LiveKit SFU on Google Cloud Platform (GCP) for efficient, low-latency media streams and Auth.js v5 for secure authentication. It was built to demonstrate proficiency in handling real-time data, managing modern frontend architecture, and deploying scalable, containerized applications on the cloud.
✨ Key Features
Secure OAuth Login: Authenticate easily and securely using your Google or GitHub account.
Instant Room Creation: Generate a unique, secure meeting room with a single click.
High-Quality Video & Audio: Low-latency communication powered by a self-hosted LiveKit SFU on GCP.
In-Meeting Controls: Easily mute/unmute your microphone and turn your camera on/off.
Screen Sharing: Share your entire screen, a specific window, or a browser tab with other participants.
Live Chat: A built-in text chat for communication during the call.
Responsive Design: A clean and fully responsive user interface that works on all devices.
🛠️ Tech Stack
This project is built with a powerful and scalable stack:
Frontend:
Next.js - A React framework for building production-grade applications.
shadcn/ui - A beautifully designed component library built on top of Radix UI and Tailwind CSS.
Tailwind CSS - A utility-first CSS framework for rapid UI development.
Backend & Real-Time Communication:
LiveKit - An open-source, scalable WebRTC SFU (Selective Forwarding Unit) for powering real-time video.
LiveKit Token Server - A simple backend service is used to securely generate access tokens for LiveKit sessions.
Authentication:
Auth.js v5 (NextAuth) - For implementing secure Google & GitHub OAuth.
Deployment & Infrastructure:
Docker - For containerizing the Next.js application.
Google Cloud Run - For deploying and scaling the containerized application.
Google Cloud Platform (GCP) - For hosting the LiveKit SFU.
Google Load Balancer - For managing traffic and providing HTTPS/SSL.
⚙️ Getting Started
To get a local copy up and running, follow these simple steps.
Prerequisites
Make sure you have the following installed on your machine:
Node.js (which includes npm)
Git
Installation & Setup
Clone the repository:
git clone [https://github.com/IamPriyabrato04/convoc.git](https://github.com/IamPriyabrato04/convoc.git)
cd convoc


Set up the Token Server (Backend):
cd server
npm install

Create a .env file in the server directory with your LiveKit credentials:
PORT=8000
LIVEKIT_API_KEY="YOUR_LIVEKIT_API_KEY"
LIVEKIT_API_SECRET="YOUR_LIVEKIT_API_SECRET"

Now, start the backend server:
npm start


Set up the Main Application (Frontend):
Open a new terminal window.
cd client 
npm install

Create a .env.local file in the client directory. This is where you'll add all your keys for LiveKit and Auth.js:
# LiveKit URL
NEXT_PUBLIC_LIVEKIT_URL="YOUR_LIVEKIT_SERVER_URL"

# Auth.js Credentials
AUTH_GOOGLE_ID="YOUR_GOOGLE_CLIENT_ID"
AUTH_GOOGLE_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
AUTH_GITHUB_ID="YOUR_GITHUB_CLIENT_ID"
AUTH_GITHUB_SECRET="YOUR_GITHUB_CLIENT_SECRET"

# A secret key for Auth.js to sign tokens
AUTH_SECRET="GENERATE_A_RANDOM_SECRET_KEY" # You can generate one with `openssl rand -base64 32`

Now, start the Next.js development server:
npm run dev


You're all set!
Open your browser and navigate to http://localhost:3000 to see the application in action.
🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
Distributed under the MIT License. See LICENSE for more information.
📧 Contact
Priyabrato Naskar - GitHub Profile
Project Link: https://github.com/IamPriyabrato04/convoc
