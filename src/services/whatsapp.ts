import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";
import qrcodeTerminal from "qrcode-terminal";
import { Server } from "socket.io";
import puppeteer from "puppeteer";
let io: Server;
let clientReady = false;
let browser = null;
let ultimoQR: string | null = null;
let isProduction = process.env.NODE_ENV === "production";
// if (process.env.NODE_ENV === "production") {
//   browser = puppeteer.launch({
//     executablePath: "/usr/bin/google-chrome",
//     headless: true,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });
// } else {
//   browser = puppeteer.launch({
//     headless: true,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });
// }

const puppeteerOptions = isProduction
  ? {
      executablePath: "/usr/bin/chromium-browser", // o /usr/bin/chromium
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ],
    }
  : {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
try {
  console.log("🚀 Iniciando Puppeteer...");
  const browser = await puppeteer.launch(puppeteerOptions);
  console.log("✅ Puppeteer lanzado correctamente");
} catch (err) {
  console.error("❌ Error lanzando Puppeteer:", err);
}
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: puppeteerOptions,
});

export const initWhatsapp = (_io: Server) => {
  io = _io;
  if (clientReady) return;

  client.on("qr", async (qr) => {
    qrcodeTerminal.generate(qr, { small: true });
    try {
      ultimoQR = await qrcode.toDataURL(qr);
    } catch (err) {
      console.error("Error generando imagen QR:", err);
    }
  });

  client.on("ready", () => {
    clientReady = true;
    console.log(`WhatsApp conectado y listo para enviar mensajes`);
    io.emit("mensaje", "✅ WhatsApp conectado");
  });

  client.on("disconnected", () => {
    console.log(`❌ WhatsApp desconectado`);
    io.emit("mensaje", "❌ WhatsApp desconectado");
  });

  client.initialize();
};

export default client;
export const getUltimoQR = () => ultimoQR;
