import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

export function generateOTP() {
  let otp;
  while (true) {
    otp = Math.ceil(Math.random() * 1_000_000);
    if (otp.toString().length === 6) {
      return otp;
    }
  }
}

// create email transporter

export function EmailTransporter(service = "smtp.gmail.com") {
  return nodemailer.createTransport({
    host: service,
    port: 465,
    secure: true,
    auth: {
      user: process.env.NodeMailer_MAIL,
      pass: process.env.NodeMailer_MAIL_APP,
    },
  });
}

export async function EmailerSender(source, destination, subject, text) {
  let transpoter = EmailTransporter();
  await transpoter.verify();
  return await transpoter.sendMail({
    from: source,
    to: destination,
    subject,
    text,
  });
}
