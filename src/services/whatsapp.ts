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

// Buscar navegador (Chrome o Edge) en ubicaciones comunes de Windows
const findChrome = () => {
  const localApp = process.env.LOCALAPPDATA || "C\\Users\\AppData\\Local";
  const possiblePaths = [
    // Chrome
    "C\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    `${localApp}\\Google\\Chrome\\Application\\chrome.exe`,
    // Edge
    "C\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    `${localApp}\\Microsoft\\Edge\\Application\\msedge.exe`,
  ];

  const fs = require("fs");
  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      return path;
    }
  }
  return null;
};

const chromePath = findChrome();
const puppeteerOptions: any = {
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--no-first-run",
    "--no-zygote",
    "--disable-gpu",
  ],
};

// Si encontramos navegador instalado, usarlo
if (chromePath) {
  puppeteerOptions.executablePath = chromePath;
  console.log("🔧 Usando navegador del sistema para WhatsApp:", chromePath);
} else {
  console.warn(
    "⚠️ No se encontró Chrome/Edge en las rutas comunes. WhatsApp no se inicializará para evitar que Puppeteer rompa el servidor."
  );
}
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: puppeteerOptions,
});

export const initWhatsapp = (_io: Server) => {
  io = _io;
  if (clientReady) return;

  // Si no hay navegador disponible, no inicializar WhatsApp para evitar crash
  if (!chromePath) {
    console.warn(
      "WhatsApp-Web no se inicializa porque no se encontró un navegador compatible (Chrome/Edge)."
    );
    return;
  }

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
