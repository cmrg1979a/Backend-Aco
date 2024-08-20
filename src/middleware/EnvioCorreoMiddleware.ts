const nodemailer = require("nodemailer");

export async function envioCorreo(data: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: "p3plzcpnl505059.prod.phx3.secureserver.net", // "mail.pic-cargo.com"
      port: 465, // 465
      secure: true,
      auth: {
        user: "sistema1@piccargo.com", // "sistema1@pic-cargo.com" // "testkaysen@gmail.com"
        pass: "b@+p@f21e48c", // "b@+p@f21e48c", // "csyvzaysfnmntjws", //
      },
    });

    const mailOptions = {
      from: data.from,
      to: data.email,
      subject: data.subject,
      html: data.html,
    };
    const mailInfo = await transporter.sendMail(mailOptions);
    let res = {
      estado: true,
      mensaje: "",
    };
    return res;
  } catch (error) {
    let res = {
      estado: false,
      mensaje: error,
    };
    return res;
  }
}
