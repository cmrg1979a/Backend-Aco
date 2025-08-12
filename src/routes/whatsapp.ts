import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import { enviarWhatsapp } from "../controllers/whatsapp.controller";
import { getUltimoQR } from "../services/whatsapp";

router.post("/enviarWhastapp", enviarWhatsapp);

router.get("/whatsapp-qr", (_req, res) => {
  const qrDataUrl = getUltimoQR();

  res.send(`
    <html>
      <head>
        <title>QR WhatsApp</title>
        <script src="/socket.io/socket.io.js"></script>
      </head>
      <body style="display:flex;align-items:center;justify-content:center;height:100vh">
        
       <div style="text-align:center">
          <h2>Escanea este QR con WhatsApp</h2>
          <img src="${qrDataUrl}" alt="QR de WhatsApp" style="border:1px solid #ccc"/>
        </div>

        <script>
          const socket = io();
          const qrImage = document.getElementById("qrImage");
          const estado = document.getElementById("estado");

          socket.on("qr", (dataUrl) => {
            qrImage.src = dataUrl;
            estado.innerText = "♻️ QR actualizado. Escanéalo con WhatsApp";
          });

          socket.on("mensaje", (msg) => {
            estado.innerText = msg;
          });
        </script>
      </body>
    </html>
  `);
});

export default router;

