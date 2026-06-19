import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract payment details
    const razorpayOrderId = formData.get('razorpay_order_id') as string;
    const razorpayPaymentId = formData.get('razorpay_payment_id') as string;
    const razorpaySignature = formData.get('razorpay_signature') as string;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    // Verify Signature securely
    const secret = process.env.RAZORPAY_KEY_SECRET as string;
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto.createHmac('sha256', secret).update(body.toString()).digest('hex');

    if (expectedSignature !== razorpaySignature) {
      console.error("Invalid Signature detected!");
      return NextResponse.json({ error: 'Invalid Payment Signature' }, { status: 400 });
    }

    // Extract user fields
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const track = formData.get('track') as string;
    const plan = formData.get('plan') as string;
    const portfolio = formData.get('portfolio') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resumeMethod = formData.get('resumeMethod') as string;
    const resumeLink = formData.get('resumeLink') as string;
    const website = formData.get('website') as string; // Honeypot
    const resumeFile = formData.get('resumeFile') as File | null;

    if (website) {
      console.log('Bot detected in paid internship form submission.');
      return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 200 });
    }

    if (!fullName || !email || !phone || !track) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic sanitization
    const escapeHTML = (str: string) => str ? str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)) : '';

    const safeFullName = escapeHTML(fullName);
    const safeEmail = escapeHTML(email);
    const safePhone = escapeHTML(phone);
    const safeTrack = escapeHTML(track);
    const safePlan = escapeHTML(plan || 'standard');
    const safePortfolio = escapeHTML(portfolio || 'N/A');
    const safeCoverLetter = escapeHTML(coverLetter || 'N/A');
    const safeResumeLink = escapeHTML(resumeLink || 'N/A');

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = [];
    let resumeDisplay = 'Not Provided';
    if (resumeMethod === 'link' && safeResumeLink !== 'N/A') {
      resumeDisplay = `<a href="${safeResumeLink}">View Resume Link</a>`;
    } else if (resumeMethod === 'upload' && resumeFile && resumeFile.size > 0) {
      resumeDisplay = 'File Uploaded (See Attachments)';
    }

    if (resumeMethod === 'upload' && resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({
        filename: resumeFile.name,
        content: buffer
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: safeEmail,
      subject: `[PAID] New Internship Application: ${fullName} - ${track}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .header { background-color: #10b981; padding: 24px; text-align: center; border-bottom: 4px solid #059669; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
            .content { padding: 32px; color: #3f3f46; line-height: 1.6; }
            .field { margin-bottom: 24px; }
            .label { font-size: 12px; text-transform: uppercase; color: #71717a; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px; }
            .value { font-size: 16px; color: #09090b; font-weight: 500; background-color: #f4f4f5; padding: 12px 16px; border-radius: 8px; border: 1px solid #e4e4e7; }
            .message-box { font-size: 15px; color: #27272a; background-color: #f4f4f5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; border-top: 1px solid #e4e4e7; border-right: 1px solid #e4e4e7; border-bottom: 1px solid #e4e4e7; }
            .footer { text-align: center; padding: 20px; font-size: 13px; color: #a1a1aa; background-color: #fafafa; border-top: 1px solid #f4f4f5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Internship Application (PAID)</h1>
            </div>
            <div class="content">
              <div class="field"><div class="label">Payment ID</div><div class="value" style="color: #10b981; font-family: monospace;">${razorpayPaymentId}</div></div>
              <div class="field"><div class="label">Full Name</div><div class="value">${safeFullName}</div></div>
              <div class="field"><div class="label">Email Address</div><div class="value"><a href="mailto:${safeEmail}" style="color: #3b82f6; text-decoration: none;">${safeEmail}</a></div></div>
              <div class="field"><div class="label">Phone Number</div><div class="value">${safePhone}</div></div>
              <div class="field"><div class="label">Program</div><div class="value">${safeTrack}</div></div>
              <div class="field"><div class="label">Plan Chosen</div><div class="value" style="text-transform: capitalize;">${safePlan}</div></div>
              <div class="field"><div class="label">Portfolio</div><div class="value">${safePortfolio !== 'N/A' ? `<a href="${safePortfolio}" style="color: #3b82f6;">${safePortfolio}</a>` : 'N/A'}</div></div>
              <div class="field"><div class="label">Resume</div><div class="value">${resumeDisplay}</div></div>
              <div class="field"><div class="label">Message</div><div class="message-box">${safeCoverLetter}</div></div>
            </div>
            <div class="footer">
              This is an automated message from the Prokodex Internship Application form.
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: attachments.length > 0 ? attachments : undefined
    };

    // Standard message for all plans since everyone gets portal access
    const planSpecificMessage = "Our team will reach out to you shortly with your Prokodex portal access credentials and the onboarding schedule.";

    // Email to Applicant
    const userMailOptions = {
      from: `"Prokodex Team" <${process.env.EMAIL_USER}>`,
      to: safeEmail,
      subject: `Prokodex: Internship Enrollment Confirmed`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .header { background-color: #3b82f6; padding: 32px 24px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; }
            .content { padding: 32px; color: #3f3f46; line-height: 1.6; font-size: 16px; }
            .greeting { font-size: 20px; font-weight: 600; color: #09090b; margin-bottom: 16px; }
            .invoice-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-top: 24px; margin-bottom: 24px; }
            .invoice-title { font-size: 14px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
            .footer { text-align: center; padding: 20px; font-size: 13px; color: #a1a1aa; background-color: #fafafa; border-top: 1px solid #f4f4f5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Congratulations! 🎉</h1>
            </div>
            <div class="content">
              <div class="greeting">Hi ${safeFullName},</div>
              <p>Welcome to <strong>Prokodex</strong>! Your enrollment in the <strong>${safeTrack}</strong> program (${safePlan.toUpperCase()} Plan) is officially confirmed.</p>
              <p>We are thrilled to have you on board. ${planSpecificMessage}</p>
              
              <div class="invoice-box">
                <div class="invoice-title">Payment Receipt</div>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 10px;">
                  <tr><td style="padding: 6px 0; color: #475569; font-weight: 500;">Transaction ID:</td><td style="padding: 6px 0; color: #0f172a; font-weight: 700; text-align: right;">${razorpayPaymentId}</td></tr>
                  <tr><td style="padding: 6px 0; color: #475569; font-weight: 500;">Order ID:</td><td style="padding: 6px 0; color: #0f172a; font-weight: 700; text-align: right;">${razorpayOrderId}</td></tr>
                  <tr><td style="padding: 6px 0; color: #475569; font-weight: 500;">Plan:</td><td style="padding: 6px 0; color: #0f172a; font-weight: 700; text-align: right; text-transform: capitalize;">${safePlan}</td></tr>
                  <tr><td style="padding: 6px 0; color: #475569; font-weight: 500;">Status:</td><td style="padding: 6px 0; color: #10b981; font-weight: 700; text-align: right;">PAID</td></tr>
                </table>
              </div>

              <p>If you have any questions before the program starts, simply reply to this email.</p>
              <p>Best regards,<br><strong>The Prokodex Team</strong></p>
            </div>
            <div class="footer">
              © ${new Date().getFullYear()} Prokodex. All rights reserved.<br>
              This is an automated receipt for your purchase.
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await transporter.sendMail(mailOptions); // To Admin
      await transporter.sendMail(userMailOptions); // To Applicant
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    // Send Telegram Notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const tgMessage = `✅ <b>PAID INTERNSHIP APPLICATION</b>\n━━━━━━━━━━━━━━━━━━\n💳 <b>Payment ID:</b> <code>${razorpayPaymentId}</code>\n👤 <b>Name:</b> <code>${safeFullName}</code>\n📧 <b>Email:</b> <code>${safeEmail}</code>\n📞 <b>Phone:</b> <code>${safePhone}</code>\n💻 <b>Program:</b> <i>${safeTrack}</i>\n📦 <b>Plan:</b> <b>${safePlan.toUpperCase()}</b>\n\n📎 <b>Resume:</b> ${resumeMethod === 'link' && safeResumeLink !== 'N/A' ? `<a href="${safeResumeLink}">View Link</a>` : (resumeMethod === 'upload' && resumeFile && resumeFile.size > 0 ? 'File Uploaded (See Email)' : 'Not Provided')}\n\n💬 <b>Cover Letter:</b>\n<blockquote>${safeCoverLetter}</blockquote>\n\n🌐 <i>via Prokodex Website</i>`;
        const tgUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: tgMessage,
            parse_mode: 'HTML',
            disable_web_page_preview: true
          })
        });
      } catch (tgError) {
        console.error("Telegram notification failed:", tgError);
      }
    }

    return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error verifying payment or submitting application:', error);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}
