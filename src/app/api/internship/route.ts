import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract fields
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const track = formData.get('track') as string;
    const plan = formData.get('plan') as string;
    const portfolio = formData.get('portfolio') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resumeMethod = formData.get('resumeMethod') as string;
    const resumeLink = formData.get('resumeLink') as string;
    const website = formData.get('website') as string; // Honeypot field

    const resumeFile = formData.get('resumeFile') as File | null;

    // 0. Honeypot Check
    if (website) {
      console.log('Bot detected in internship form submission.');
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
    const safePlan = escapeHTML(plan || 'general');
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
      subject: `New Internship Application: ${fullName} - ${track}`,
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
              <h1>Internship Application</h1>
            </div>
            <div class="content">
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

    await transporter.sendMail(mailOptions);

    // Send Telegram Notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const tgMessage = `🎓 <b>NEW INTERNSHIP APPLICATION</b>\n━━━━━━━━━━━━━━━━━━\n👤 <b>Name:</b> <code>${safeFullName}</code>\n📧 <b>Email:</b> <code>${safeEmail}</code>\n📞 <b>Phone:</b> <code>${safePhone}</code>\n💻 <b>Program:</b> <i>${safeTrack}</i>\n📦 <b>Plan:</b> <b>${safePlan.toUpperCase()}</b>\n\n📎 <b>Resume:</b> ${resumeMethod === 'link' && safeResumeLink !== 'N/A' ? `<a href="${safeResumeLink}">View Link</a>` : (resumeMethod === 'upload' && resumeFile && resumeFile.size > 0 ? 'File Uploaded (See Email)' : 'Not Provided')}\n\n💬 <b>Message:</b>\n<blockquote>${safeCoverLetter}</blockquote>\n\n🌐 <i>via Prokodex Website</i>`;
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
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
