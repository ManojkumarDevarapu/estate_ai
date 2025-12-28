# 🏡 Real Estate Property Analysis with AI Insights

A **full-stack web application** that analyzes real-estate properties and provides **AI-powered market valuation insights** along with **comparative market analysis charts**.

This project was built for **SDE / placement evaluation** and demonstrates **real-world full-stack architecture**, **secure authentication**, **AI integration**, and **user-specific data handling**, deployed fully on the cloud.

---

## 🌐 Live Demo

* **Frontend (Client):**
  👉 [https://estate-ai-client.onrender.com](https://estate-ai-client.onrender.com)

* **Backend (API):**
  👉 [https://estate-ai-cdq0.onrender.com](https://estate-ai-cdq0.onrender.com)

> ⚠️ Note: Since this is deployed on free-tier hosting, the first request may take ~30–50 seconds if the server was idle.

---

## 🚀 Features

* 🔐 User authentication using **JWT** (Register / Login)
* 🏠 Property analysis dashboard

  * Enter location, size, and price
* 🤖 **AI-powered market valuation & price recommendation**
* 📊 **Comparative market analysis charts** using Recharts
* 🕒 User-specific analysis history stored in MongoDB
* 🗑️ Delete individual property analysis records
* 🛡️ Protected routes (dashboard, history, reports)
* 🔄 **Fallback-safe AI logic** if AI service is unavailable

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* React Router
* Axios
* Recharts
* Tailwind CSS + DaisyUI

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* OpenAI SDK (API and along with fallback support)

### Cloud & Tools

* MongoDB Atlas
* Render (Web Service + Static Site)
* GitHub

---

## 📁 Project Structure

```
estate_ai/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/              # Node backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .env.example
└── README.md
```

---

## 🧠 AI Integration (How It Works)

The backend integrates with the **OpenAI API** to generate AI-driven real-estate insights.

### When `OPENAI_API_KEY` is available:

* A real OpenAI API call is made
* AI returns:

  * Estimated market value
  * Confidence score
  * Pricing recommendation
  * Reasoning explanation

### When OpenAI is unavailable (expired key / quota / network issue):

* A **deterministic fallback valuation logic** is applied
* Output format remains exactly the same
* Application continues to work without crashing

### Benefits:

* ✅ Correct OpenAI API usage
* ✅ No application failures
* ✅ Cost-safe evaluation
* ✅ Stable demo behavior

---

## ⚙️ Environment Configuration

Create a `.env` file inside the **server/** directory.

### Backend `.env`

```env
PORT=10000
MONGO_URI=mongodb://127.0.0.1:27017/estateai
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
JWT_SECRET=your_secret_key
```

### Notes

* `.env` files are ignored by Git
* `.env.example` is provided
* OpenAI key is optional (fallback logic is implemented)

---

## 📦 Installing Dependencies (Required)

### Prerequisites

* Node.js **v18+**
* npm
* MongoDB (local) OR MongoDB Atlas

---

### 🔧 Backend Installation

```bash
cd server
npm install
```

This installs required backend packages such as:

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken openai
npm install --save-dev nodemon
```

---

### 🎨 Frontend Installation

```bash
cd client
npm install
```

This installs frontend dependencies such as:

```bash
npm install react react-dom react-router-dom axios recharts
npm install -D tailwindcss postcss autoprefixer
```

---

## ▶️ Running the Project Locally

### Start Backend

```bash
cd server
npm run dev
```

Backend runs on:

```
http://localhost:10000
```

---

### Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧪 Demo Flow

1. User registers a new account
2. User logs in
3. User enters property details:

   * Address / city
   * Size
   * Price
4. AI analysis is triggered
5. AI returns valuation & recommendation
6. Comparative price chart is displayed
7. Data is stored in MongoDB
8. User can view history (user-specific)
9. User can delete individual records

---

## 🔐 Authentication & Security

* JWT-based authentication
* Protected frontend routes
* Protected backend APIs
* Each record linked to authenticated user
* User data fully isolated
* Unauthorized access is blocked

---

## 🌍 Deployment Notes

* Backend deployed as **Render Web Service**
* Frontend deployed as **Render Static Site**
* MongoDB hosted on **MongoDB Atlas**
* SPA routing handled using **Render Rewrite Rule**:

```
Source: /*
Destination: /index.html
Action: Rewrite
```

---

## ⚠️ Free Tier Behavior (Normal)

* Render services may sleep after inactivity
* First request after sleep may take ~30–50 seconds
* MongoDB Atlas remains persistent
* No data loss occurs

---

## 📌 Evaluation Highlights

* Real-world full-stack architecture
* Verified AI integration
* Robust fallback logic
* Clean separation of concerns
* Scalable, maintainable design
* Suitable for:

  * Placements
  * Internships
  * Academic evaluation
  * Portfolio showcase

---

## 👨‍💻 Author

**Manoj Kumar**

---

## ⭐ Final Note

This project is **fully deployable, reproducible, and production-ready**.
Anyone cloning this repository can follow the steps above and run it successfully.

If you like it, ⭐ star the repository 🙂
