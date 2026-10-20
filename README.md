# EventFlow 🎉

EventFlow is an AI-powered event management web application where users can explore events, register for them, and manage their bookings. I built this project to practice my MERN stack development skills and learn how to integrate APIs and deploy a full-stack application.

## 🌐 Live Demo

- **Frontend:** https://eventflow-frontend-4lsd.onrender.com
- **Backend:** https://eventflow-backend-6urw.onrender.com

## ✨ Features

- User registration and login
- Browse and explore events
- Search and filter events by category
- Create and manage events
- Upload event images using Cloudinary
- Generate event descriptions using AI
- Book events and manage bookings
- Online payment integration using Razorpay
- User reviews and ratings
- Responsive user interface

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

**Other Tools and Services**
- Cloudinary for image uploads
- Gemini API for AI-generated event descriptions
- Razorpay for payment integration
- Docker for containerization
- Render for deployment
- Git and GitHub for version control

## 📁 Project Structure

```text
EventFlow/
├── client/          # React frontend
├── server/          # Node.js and Express backend
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/rutikaC/EventFlow.git
cd EventFlow
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder and add your required environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Add any other environment variables required by your project, such as email or Google OAuth credentials.

Start the backend:

```bash
npm run dev
```

### 3. Setup the frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## 🐳 Running with Docker

EventFlow includes Docker configuration to help run the application in containers.

If your Docker Compose configuration is ready, run this command from the project root:

```bash
docker compose up --build
```

Make sure the environment variables, service configuration, and database connection are set correctly before starting the application.

## 🔐 Environment Variables

This project uses environment variables to store API keys, database credentials, and authentication secrets.

**Do not commit your `.env` files or expose your secret keys on GitHub.** Use your own credentials when running the project locally.

## 📚 What I Learned

While building EventFlow, I got practical experience with:

- Building a full-stack application using the MERN stack
- Connecting React with a REST API
- Implementing authentication and protected routes
- Working with MongoDB and Mongoose
- Uploading images to Cloudinary
- Integrating AI-generated content
- Implementing online payment functionality
- Using Docker and deploying an application

## 👩‍💻 Author

**Rutika Chavhan**

- GitHub: [rutikaC](https://github.com/rutikaC)

---

Thanks for checking out EventFlow! 😊
