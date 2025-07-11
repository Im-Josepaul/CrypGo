import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { note, filename, base64Image } = body;

    const base64Data = base64Image?.replace(/^data:.+;base64,/, "");
    const mimeMatch = base64Image?.match(/^data:(.+);base64,/);
    const contentType = mimeMatch?.[1] || "application/octet-stream";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_DEFAULT_EMAIL,
        pass: process.env.NEXT_PUBLIC_PASSKEY,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_DEFAULT_EMAIL,
      to: process.env.NEXT_PUBLIC_DEFAULT_EMAIL,
      subject: "New Crypto Purchase Request",
      text: note,
      attachments: base64Image
        ? [
            {
              filename,
              content: Buffer.from(base64Data, "base64"),
              contentType,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
