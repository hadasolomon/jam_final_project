import { EMAIL_ADDRESS, EMAIL_PASSWORD } from "@/lib/config";
import nodemailer, { TransportOptions } from "nodemailer";

export function getEmailTransport() {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  } as TransportOptions);
  return transport;
}

export async function sendEmail(msg: string) {
  const transport = getEmailTransport();
  const message = {
    from: EMAIL_ADDRESS,
    to: EMAIL_ADDRESS,
    subject: "פניית פגיעה ברשת לטיפול",
    text: msg,
    html: `<p>${msg}</p>`,
  };
  let success = false;
  try {
    await transport.sendMail(message);
    success = true;
  } catch (error) {
    console.log(error);
  }
  return success;
}

export async function sendEmailWithAttachment(msg: string, attachment: File | null) {
  const transport = getEmailTransport();
  const message = {
    from: EMAIL_ADDRESS,
    to: EMAIL_ADDRESS,
    subject: "פניית פגיעה ברשת לטיפול",
    text: msg,
    html: `<p>${msg}</p>`,
    attachments: attachment
      ? [
          {
            filename: attachment.name,
            content: Buffer.from(await attachment.arrayBuffer()),
          },
        ]
      : [],
  };
  let success = false;
  try {
    await transport.sendMail(message);
    success = true;
  } catch (error) {
    console.log(error);
  }
  return success;
}
