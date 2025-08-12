import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";
import qrcodeTerminal from "qrcode-terminal";
import { Server } from "socket.io";
import puppeteer from "puppeteer";
let io: Server;
let clientReady = false;
let browser = null;
let ultimoQR: string | null = null;
if (global.esProduccion) {
  browser = puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
} else {
  browser = puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: browser,
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
