🏡 Real Estate Property Analysis with AI Insights

A full-stack web application that analyzes real-estate properties and provides AI-powered market valuation insights along with comparative market analysis charts.

This project is built for SDE evaluation / placement purposes and demonstrates real-world full-stack architecture, secure authentication, AI integration, and user-specific data handling.

🚀 Features

User authentication using JWT (Register / Login)

Property analysis dashboard for entering location, size, and price

AI-powered market valuation and price recommendation (OpenAI API)

Comparative market analysis chart using Recharts

User-specific analysis history stored in MongoDB

Delete individual analysis records

Fallback-safe AI logic to prevent failures when AI service is unavailable

🛠 Tech Stack
Frontend

React.js

React Router

Recharts

Tailwind CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

OpenAI SDK (real API integration with fallback support)

🧠 AI Integration

The backend integrates with the OpenAI API to generate AI-driven property valuation insights.

When a valid OPENAI_API_KEY is provided:

The system makes a real OpenAI API call

AI generates estimated value, confidence score, recommendation, and reasoning

If the OpenAI service is unavailable (expired key, quota limit, or network issue):

A deterministic fallback valuation logic is applied

This design ensures:

Correct OpenAI API usage

No application crashes

Consistent output structure

Cost-safe evaluation and testing

OpenAI integration is implemented at the backend service layer following industry best practices.

⚙️ Environment Configuration

Create a .env file inside the server folder.

Backend .env
MONGO_URI=mongodb://127.0.0.1:27017/estateai
OPENAI_API_KEY=YOUR_OPENAI_API_KEY

JWT_SECRET=your_secret_key

Notes

.env is ignored by Git

.env.example is provided for reference

OpenAI API usage is minimal and intended for demo/testing purposes

▶️ Running the Project
Start Backend
cd server
npm install
npm run dev

Start Frontend
cd client
npm install
npm run dev

🧪 Demo Flow

User registers a new account

User logs in

User enters property details (address, city, size, price)

AI analysis is triggered

OpenAI returns estimated value, confidence score, recommendation, and reasoning

Comparative price chart is displayed

Analysis is stored in MongoDB

User can view analysis history (user-specific)

User can delete individual records

🔐 Authentication & Security

JWT-based authentication

Protected routes for dashboard, history, and reports

Each analysis is linked to the authenticated user

User data is fully isolated

Unauthorized users are redirected to login

📊 Architecture Overview
Frontend (React)
   → Backend API (Express)
       → AI Analysis Service (OpenAI API / Fallback Logic)
           → MongoDB (User-specific Storage)

📌 Evaluation Notes

Real-world full-stack architecture

Verified OpenAI API integration

Fallback logic for robustness and cost safety

Clean separation of concerns

Scalable and maintainable design

Suitable for placements, internships, and academic evaluation

👨‍💻 Author
Manoj Kumar