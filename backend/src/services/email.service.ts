import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type SendPasswordResetCodeParams = {
  to: string;
  code: string;
};

export async function sendPasswordResetCode({
  to,
  code,
}: SendPasswordResetCodeParams) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Código para redefinir sua senha",
    text: `Seu código para redefinir a senha é: ${code}. Ele expira em 15 minutos.`,
  });
}
