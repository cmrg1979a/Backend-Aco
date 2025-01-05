"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default); // Crea el servidor HTTP
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
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
const PORT = app_1.default.get("port");
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map