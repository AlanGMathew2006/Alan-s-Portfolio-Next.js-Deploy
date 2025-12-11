import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Ensure this route runs on the Node.js runtime (Nodemailer requires Node APIs)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const maybe = body as Partial<ContactPayload> | null;
    const name = typeof maybe?.name === "string" ? maybe!.name : "";
    const email = typeof maybe?.email === "string" ? maybe!.email : "";
    const subject = typeof maybe?.subject === "string" ? maybe!.subject : "";
    const message = typeof maybe?.message === "string" ? maybe!.message : "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT
      ? parseInt(process.env.SMTP_PORT, 10)
      : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure =
      String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
    const toEmail = process.env.CONTACT_TO_EMAIL || user;

    if (!host || !user || !pass || !toEmail) {
      return NextResponse.json(
        { error: "Email transport is not configured on the server." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 12px 0;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space:pre-wrap;border-left:3px solid #e5e7eb;padding:8px 12px;background:#f9fafb">${message}</div>
      </div>
    `;

    await transporter.sendMail({
      from: {
        name: name || "Website Contact",
        address: user as string,
      },
      to: toEmail,
      subject: `[Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("/api/contact error", err);
    const msg =
      err instanceof Error
        ? err.message
        : "Failed to send your message. Please try again later.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
