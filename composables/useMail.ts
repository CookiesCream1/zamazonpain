import * as nodemailer from "nodemailer";

export default function useMail() {
  const { mail } = useRuntimeConfig();
  return nodemailer.createTransport(mail);
}
