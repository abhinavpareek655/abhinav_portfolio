import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_RECEIVER,
      subject,
      text: message,
      html: `
        <div style="font-family:Arial,sans-serif; line-height:1.5; color:#333;">
          <h2 style="color:#4F46E5;">New message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border:none; border-top:1px solid #eee;"/>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
