import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple HTML escape function to prevent XSS in emails
const escapeHTML = (str: string) => {
  return str.replace(/[&<>'"]/g,
    (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const inquiryType = formData.get('inquiryType') as string;
    const message = formData.get('message') as string;
    const website = formData.get('website') as string;
    const resume = formData.get('resume') as File | null;

    // 0. Honeypot Check
    if (website) {
      // If the honeypot field is filled, it's a bot. We fake a success response.
      console.log('Bot detected in contact form submission.');
      return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
    }

    // 1. Basic Validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Input Sanitization (Security: Prevent XSS in email client)
    const safeFirstName = escapeHTML(firstName);
    const safeLastName = escapeHTML(lastName);
    const safeEmail = escapeHTML(email);
    const safeInquiryType = escapeHTML(inquiryType || 'Not specified');
    const safeMessage = escapeHTML(message).replace(/\\n/g, '<br>');

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = [];
    let resumeAttachedText = 'No resume attached';
    if (resume) {
      const arrayBuffer = await resume.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: resume.name,
        content: buffer,
      });
      resumeAttachedText = `Resume attached: ${resume.name}`;
    }

    // Email content using sanitized inputs
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self
      replyTo: safeEmail,
      subject: `New Contact Inquiry from ${firstName} ${lastName} - ${inquiryType || 'Not specified'}`,
      attachments,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .header { background-color: #09090b; padding: 24px; text-align: center; border-bottom: 4px solid #3b82f6; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
            .content { padding: 32px; color: #3f3f46; line-height: 1.6; }
            .field { margin-bottom: 24px; }
            .label { font-size: 12px; text-transform: uppercase; color: #71717a; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px; }
            .value { font-size: 16px; color: #09090b; font-weight: 500; background-color: #f4f4f5; padding: 12px 16px; border-radius: 8px; border: 1px solid #e4e4e7; }
            .message-box { font-size: 15px; color: #27272a; background-color: #f4f4f5; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; border-top: 1px solid #e4e4e7; border-right: 1px solid #e4e4e7; border-bottom: 1px solid #e4e4e7; }
            .footer { text-align: center; padding: 20px; font-size: 13px; color: #a1a1aa; background-color: #fafafa; border-top: 1px solid #f4f4f5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>PROKODEX</h1>
            </div>
            <div class="content">
              <h2 style="margin-top: 0; color: #09090b; font-size: 22px; margin-bottom: 24px; text-align: center;">New Contact Submission</h2>
              
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${safeFirstName} ${safeLastName}</div>
              </div>
              
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${safeEmail}" style="color: #3b82f6; text-decoration: none;">${safeEmail}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Inquiry Type</div>
                <div class="value">${safeInquiryType}</div>
              </div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${safeMessage}</div>
              </div>
              
              ${resume ? `
              <div class="field">
                <div class="label">Resume</div>
                <div class="value">${resumeAttachedText}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              This is an automated message from the Prokodex website contact form.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send Telegram Notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const tgMessage = `🔔 <b>NEW CONTACT INQUIRY</b>\n━━━━━━━━━━━━━━━━━━\n👤 <b>Name:</b> <code>${safeFirstName} ${safeLastName}</code>\n📧 <b>Email:</b> <code>${safeEmail}</code>\n🏷️ <b>Inquiry Type:</b> <i>${safeInquiryType}</i>\n\n💬 <b>Message:</b>\n<blockquote>${escapeHTML(message)}</blockquote>\n\n🌐 <i>via Prokodex Website</i>`;
        const tgUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        await fetch(tgUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: tgMessage,
            parse_mode: 'HTML'
          })
        });
      } catch (tgError) {
        console.error("Telegram notification failed:", tgError);
      }
    }

    return NextResponse.json({ success: true, message: 'Email and Notification sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
