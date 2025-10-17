import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import { enviarWhatsapp } from "../controllers/whatsapp.controller";
import { getUltimoQR } from "../services/whatsapp";

router.post("/enviarWhastapp", enviarWhatsapp);

router.get("/whatsapp-qr", (_req, res) => {
  const qrDataUrl = getUltimoQR();

  const html = `
    <html>
      <head>
        <title>QR WhatsApp</title>
        <script src="/socket.io/socket.io.js"></script>
      </head>
      <body style="display:flex;align-items:center;justify-content:center;height:100vh">
        <div style="text-align:center">
          <h2>Escanea este QR con WhatsApp</h2>
          ${
            qrDataUrl
              ? `<img src="${qrDataUrl}" alt="QR de WhatsApp" style="border:1px solid #ccc"/>`
              : `<p style="font-size:18px">⏳ Generando QR... recarga en unos segundos.</p>`
          }
        </div>

        <script>
          const socket = io();
          socket.on("qr", (dataUrl) => {
            document.body.innerHTML = '<img src="' + dataUrl + '" alt="QR actualizado" />';
          });
          socket.on("mensaje", (msg) => {
            console.log(msg);
          });
        </script>
      </body>
    </html>
  `;

  res.send(html);
});

export default router;
