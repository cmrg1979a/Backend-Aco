
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import app from "./app";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export { io };

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("join-empresa", (id_branch) => {
    console.log(`Cliente ${socket.id} se uni� a la sala: ${id_branch}`);
    socket.join(id_branch);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

const PORT = process.env.APP_PORT || app.get("APP_PORT") || 9200;

server.listen(PORT, () => {
  console.log(`?? Servidor escuchando en PUERTO: ${PORT}`);
});
