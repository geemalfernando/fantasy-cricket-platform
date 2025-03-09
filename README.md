# 🏏 Spirit11 - Fantasy Cricket Platform

Spirit11 is a fantasy cricket platform built using **MERN Stack** (MongoDB, Express.js, React, Node.js) with **SQLite3** as the database. It allows users to create teams, participate in fantasy leagues, track player performance, and compete on leaderboards.

## 🚀 Features

- 🔐 **User Authentication** (Admin & Player Roles)
- 🏆 **Leaderboard System** to track player scores
- 🏏 **Team Selection & Management**
- 🛠 **Admin Panel** for managing players and matches
- 📊 **Live Updates & Statistics**
- 💬 **Chatbot for User Assistance**

---

## 🏗️ Tech Stack

**Frontend:**
- ⚛️ React.js (with React Router & Context API)
- 🎨 Tailwind CSS for styling
- ⚡️ Axios for API requests

**Backend:**
- 🖥️ Node.js & Express.js
- 🛢️ SQLite3 for data storage
- 🔐 JWT Authentication & Middleware

---

## 📂 Project Structure

```
fantasy-cricket-platform
│
├── /frontend
│   ├── /public
│   ├── /src
│   │   ├── /components (UI components)
│   │   ├── /context (Global state)
│   │   ├── /pages (App pages)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── /backend
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── /middleware
│   ├── server.js
│   ├── package.json
│   └── .env
```

---

## 🛠️ Setup Instructions

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/spirit11.git
cd spirit11
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
cp .env.example .env   # Configure environment variables
node server.js         # Start the backend server
```

### **3️⃣ Frontend Setup**
```sh
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

---

## 🔑 Authentication & Authorization

- **Admin Users:** Have full control over players, teams, and matches.
- **Players:** Can create teams, join leagues, and compete.

### **Login API**
```http
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
_Response:_
```json
{
  "token": "jwt_token",
  "role": "admin"
}
```

---

## 📜 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User login |
| `/api/players` | GET | Fetch all players |
| `/api/teams` | POST | Create a team |
| `/api/leaderboard` | GET | Fetch leaderboard data |

---

## 🤝 Contributing

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature-branch`)
3. **Commit Changes** (`git commit -m "Add feature XYZ"`)
4. **Push to GitHub** (`git push origin feature-branch`)
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🎯 Future Enhancements

- 📱 **Mobile-Friendly UI**
- 🔔 **Real-time Notifications**
- 📊 **Advanced Player Stats**

---

🚀 **Built with ❤️ by කෝඩ් KARAYO

