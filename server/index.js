const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Change if needed
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const rooms = new Map(); // Stores active rooms and users

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }

    rooms.get(roomId).add(socket.id);
    console.log(`📌 User ${socket.id} joined room: ${roomId}`);
    console.log("🏠 Active rooms:", rooms);
  });

  socket.on("codeChange", ({ roomId, code }) => {
    socket.to(roomId).emit("codeUpdate", code);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    for (const [roomId, users] of rooms) {
      users.delete(socket.id);
      if (users.size === 0) {
        rooms.delete(roomId);
      }
    }
    console.log("🏠 Updated rooms:", rooms);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server is running on port 5000");
});
