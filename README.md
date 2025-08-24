


# Realtime Chat App

A simple realtime chat application built with **Express**, **Mongoose**, **CORS**, **Body-Parser**, and **Socket.IO**.

## 🚀 Features
- User registration and login
- MongoDB as the database (via Mongoose)
- REST API for authentication and messaging
- Realtime messaging with **Socket.IO**
- CORS enabled for cross-origin requests
- JSON body parsing using **Body-Parser**
- Scalable backend with Node.js and Express

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Realtime:** Socket.IO
- **Middleware:** CORS, Body-Parser

---

```
## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/realtime-chat-app.git
   cd realtime-chat-app
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make sure MongoDB is running locally or provide a MongoDB Atlas URI.

4. Create a `.env` file in the root directory and add:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the server:

   ```bash
   npm start
   ```

---

## 📡 API Endpoints

### Authentication

* `POST /register` → Register a new user
* `POST /login` → Login user and get token

### Messages

* `GET /messages` → Fetch all messages
* `POST /messages` → Send a message

---

## ⚡ Realtime with Socket.IO

* Client connects via `io("http://localhost:5000")`
* Listens for events:

  * `message` → Receive new messages
  * `join` → User joins a room
* Emits events:

  * `sendMessage` → Send message to the server

---

## 🧪 Testing

To run the server in development mode with auto-restart:

```bash
npm run dev
```

---

## ✅ Verify Dependencies

To check if the required libraries are installed:

```bash
npm list express mongoose cors body-parser socket.io
```

---

## 📜 License

This project is licensed under the MIT License.

```

---

Do you want me to also include a **sample folder structure with files (app.js, models, routes, etc.)** inside this README?
```
