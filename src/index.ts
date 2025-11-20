import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

import app from "./app";
const server = http.createServer(app); // Crea el servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "*", // Permite todas las conexiones de origen
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("join-empresa", (id_branch) => {
    console.log(`Cliente ${socket.id} se unió a la sala: ${id_branch}`);
    socket.join(id_branch);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Inicia el servidor en el puerto especificado
const PORT = app.get("APP_PORT");
server.listen(PORT, () => {
  console.log(`Servidor escuchando en PUERTO:${PORT}`);
});

export { io };
