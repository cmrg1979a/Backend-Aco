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

// Buscar Chrome en ubicaciones comunes de Windows
const findChrome = () => {
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  ];
  
  const fs = require('fs');
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

// Si encontramos Chrome instalado, usarlo
if (chromePath) {
  puppeteerOptions.executablePath = chromePath;
  console.log('🔧 Usando Chrome del sistema:', chromePath);
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
