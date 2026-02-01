<div align="center">
💬 Chat Application
Real-Time MERN Chat App with Socket.IO

A full-stack real-time chat application built with React, Node.js, MongoDB, and Socket.IO.

🔗 Live Demo: https://chat-application-bt8v.onrender.com

</div>
✨ Key Features
Feature	Description
🔐 Authentication	Secure JWT-based login system
💬 Real-time Chat	Instant messaging using Socket.IO
👥 Users	One-to-one chat support
📡 Status	Online / offline indicators
☁️ Media	Image upload via Cloudinary
📱 Responsive	Works on all devices
⚡ Fast UI	Vite + React
🌍 Deployed	Hosted on Render
🛠 Tech Stack
Frontend

React 19

Vite

Tailwind CSS

Zustand

React Query

Socket.IO Client

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT

Socket.IO

Cloudinary

Nodemailer

📁 Folder Structure
Chat-Application
│
├── backend
│   └── src
│       ├── controllers
│       ├── models
│       ├── routes
│       └── index.js
│
├── frontend
│   └── app
│       ├── src
│       ├── public
│       └── dist
│
└── README.md

⚙️ Environment Setup

Create a .env file inside backend/

PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

CLOUDINARY_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

EMAIL_USER=xxxx
EMAIL_PASS=xxxx

🚀 Getting Started
1. Clone Repository
git clone https://github.com/Ankushkumardas/Chat-Application
cd Chat-Application

2. Install Dependencies
npm install --prefix backend
npm install --prefix frontend/app

3. Run in Development

Backend:

npm run dev --prefix backend


Frontend:

npm run dev --prefix frontend/app

🏗 Production Build
npm run build --prefix frontend/app


Creates:

frontend/app/dist

🌍 Render Deployment
Build Command
npm install --prefix backend;
npm install --prefix frontend/app;
npm run build --prefix frontend/app

Start Command
npm run start --prefix backend

🧠 What You Learn From This Project

WebSocket real-time systems

Full authentication flow

Backend serving frontend build

Cloudinary file handling

Production deployment

Scalable project structure

👨‍💻 Author

Ankush Kumar Das
B.Tech CSE (MERN Stack)
📍 Assam, India

GitHub: https://github.com/Ankushkumardas

LinkedIn: https://linkedin.com/in/ankushdas

<div align="center">
⭐ If you found this useful

Give it a star and feel free to fork or contribute!

</div>
Why this README looks professio
