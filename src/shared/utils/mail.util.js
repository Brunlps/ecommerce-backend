const nodemailer = require("nodemailer");
const { tr } = require("zod/v4/locales");

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  console.warn('EMAIL_USER ou EMAIL_PASS não configurados.');
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
});

const sendMail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: emailUser,
      to,
      subject,
      html,
      text
    });
    console.log('📧 Email enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error.message);
    return null;
  }
};

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ Erro na configuração do email:", error.message);
//   } else {
//     console.log("✅ Servidor de email pronto para enviar mensagens");
//   }
// });

// transporter.sendMailSafe = async (options) => {
//   try {
//     const info = await transporter.sendMail(options);
//     console.log('📧 Email enviado:', info.messageId);
//     return info;
//   } catch (error) {
//     console.error('❌ Erro ao enviar email:', error.message);
//     // Não lança erro para não quebrar a aplicação
//     return null;
//   }
// };

module.exports = transporter;
