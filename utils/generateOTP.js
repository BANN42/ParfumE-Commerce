import nodemailer from "nodemailer";
import { config } from "dotenv";
import { randomInt } from "node:crypto";
config();

export function generateOTP() {
  return randomInt(100_000 , 999_999);
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
