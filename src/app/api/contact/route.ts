import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const emailStyles = `
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #fafafa; background: #0a0a0a; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #0a0a0a 0%, #111 100%); padding: 40px 30px; text-align: center; border-bottom: 3px solid #22c55e; }
    .header h1 { color: #22c55e; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
    .content { background: linear-gradient(180deg, #111 0%, #0a0a0a 100%); padding: 40px 30px; }
    .detail { margin-bottom: 16px; }
    .label { color: #22c55e; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #fafafa; font-size: 16px; }
    .footer { background: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #222; }
    .footer p { color: #71717a; font-size: 13px; }
    .highlight { background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 24px; margin: 24px 0; }
    .button { display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #0a0a0a; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px; }
    .logo { font-size: 24px; font-weight: 700; }
    .logo span { color: #22c55e; }
  </style>
`;

const ownerEmailTemplate = (name: string, email: string, phone: string, service: string, date: string, message: string) => `
<!DOCTYPE html>
<html>
<head>${emailStyles}</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo"><span style="color: white;">The Bike</span> <span>Mech</span></div>
      <h1 style="margin-top: 16px;">New Booking Request</h1>
    </div>
    <div class="content">
      <div class="highlight">
        <div class="detail">
          <div class="label">Customer Name</div>
          <div class="value">${name}</div>
        </div>
        <div class="detail">
          <div class="label">Email</div>
          <div class="value">${email}</div>
        </div>
        <div class="detail">
          <div class="label">Phone</div>
          <div class="value">${phone}</div>
        </div>
        <div class="detail">
          <div class="label">Service</div>
          <div class="value">${service || "Not specified"}</div>
        </div>
        <div class="detail">
          <div class="label">Preferred Date</div>
          <div class="value">${date || "To be confirmed"}</div>
        </div>
      </div>
      <div class="detail">
        <div class="label">Message</div>
        <div class="value">${message}</div>
      </div>
    </div>
    <div class="footer">
      <p>The Bike Mech - Professional Bicycle Repair Services</p>
      <p>67A Old St Faiths Road, Umtentweni, KwaZulu-Natal</p>
    </div>
  </div>
</body>
</html>
`;

const customerEmailTemplate = (name: string, service: string, date: string) => `
<!DOCTYPE html>
<html>
<head>${emailStyles}</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo"><span style="color: white;">The Bike</span> <span>Mech</span></div>
      <h1 style="margin-top: 16px;">Booking Confirmed</h1>
    </div>
    <div class="content">
      <p style="font-size: 16px; color: #fafafa; margin-bottom: 8px;">Hi ${name},</p>
      <p style="color: #a1a1aa; margin-bottom: 24px;">Thank you for booking with The Bike Mech!</p>
      <div class="highlight">
        <div class="detail">
          <div class="label">Service</div>
          <div class="value">${service}</div>
        </div>
        <div class="detail">
          <div class="label">Preferred Date</div>
          <div class="value">${date || "To be confirmed"}</div>
        </div>
      </div>
      <p style="color: #a1a1aa; margin-top: 24px;">We will get back to you within <strong style="color: #22c55e;">24 hours</strong> to confirm your booking.</p>
      <p style="color: #a1a1aa; margin-top: 16px;">If urgent, contact us directly:</p>
      <p style="color: #22c55e; font-weight: 600; font-size: 18px; margin-top: 8px;">062 323 5295</p>
    </div>
    <div class="footer">
      <p><strong>The Bike Mech</strong></p>
      <p>Professional Bicycle Repair Services</p>
      <p>67A Old St Faiths Road, Umtentweni, Hibiscus Coast, KwaZulu-Natal</p>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_FROM,
      replyTo: email,
      subject: `New Booking - ${name} - ${service || "General Inquiry"}`,
      html: ownerEmailTemplate(name, email, phone, service, date, message),
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Booking Confirmed - The Bike Mech",
      html: customerEmailTemplate(name, service, date),
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
