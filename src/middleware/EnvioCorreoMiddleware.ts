// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
let SENDGRID_API_KEY =
  "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";
sgMail.setApiKey(SENDGRID_API_KEY);

// console.log(sgMail);
export async function envioCorreo(data: any) {
  const mailOptions = {
    from: "aco@agentedecargaonline.com",
    to: data.email,
    subject: data.subject,
    text: data.text || "Texto alternativo del correo", // Texto alternativo predeterminado
    html: data.html || "<p>Contenido HTML de prueba</p>", // HTML predeterminado si falta
  };

  try {
    await sgMail.send(mailOptions); // Espera a que el correo se envíe
    return {
      estado: true,
      mensaje: "Correo enviado correctamente",
    };
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return {
      estado: false,
      mensaje: "Ocurrió un error al enviar el correo",
    };
  }
}
