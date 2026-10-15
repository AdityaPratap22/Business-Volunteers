import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const MAIN_RECEIVER_EMAIL = 'contact.businessvolunteers@gmail.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, phone, message, planName, growthGoal, website, formType, service } = body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.RECEIVER_EMAIL || MAIN_RECEIVER_EMAIL;

    const isStrategy = formType === 'strategy' || !!planName || !!growthGoal;
    const subject = isStrategy
      ? `🚀 New Strategy Booking: ${name} (${planName || 'General Strategy'})`
      : `📩 New Contact Inquiry from ${name} - Business Volunteers`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 14px; color: #94a3b8; }
          .badge { display: inline-block; background: #ff4e27; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px; }
          .content { padding: 30px 24px; }
          .data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .data-table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .data-table tr:last-child td { border-bottom: none; }
          .label { font-weight: 700; color: #475569; width: 140px; }
          .value { color: #0f172a; font-weight: 500; }
          .message-box { background: #f8fafc; border-left: 4px solid #ff4e27; padding: 16px; border-radius: 0 8px 8px 0; margin-top: 12px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
          .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">${isStrategy ? 'Growth Strategy Session' : 'Direct Inquiry'}</span>
            <h1>Business Volunteers Lead Notification</h1>
            <p>New submission received via businessvolunteers.online</p>
          </div>
          <div class="content">
            <table class="data-table">
              <tr>
                <td class="label">Full Name</td>
                <td class="value"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${email}" style="color: #ff4e27; text-decoration: none;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td class="label">Phone / WhatsApp</td>
                <td class="value"><a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a></td>
              </tr>` : ''}
              ${service ? `
              <tr>
                <td class="label">Service Required</td>
                <td class="value"><strong style="color: #ff4e27;">${service}</strong></td>
              </tr>` : ''}
              ${website ? `
              <tr>
                <td class="label">Current Website</td>
                <td class="value"><a href="${website.startsWith('http') ? website : `https://${website}`}" target="_blank" style="color: #0284c7;">${website}</a></td>
              </tr>` : ''}
              ${planName ? `
              <tr>
                <td class="label">Selected Tier / Plan</td>
                <td class="value"><span style="background: #fff1ee; color: #ff4e27; padding: 2px 8px; border-radius: 4px; font-weight: 700;">${planName}</span></td>
              </tr>` : ''}
              ${growthGoal ? `
              <tr>
                <td class="label">Primary Growth Goal</td>
                <td class="value"><strong>${growthGoal}</strong></td>
              </tr>` : ''}
            </table>

            ${message ? `
              <div style="margin-top: 24px;">
                <span class="label" style="display: block; margin-bottom: 6px;">Client Message / Specific Requirements:</span>
                <div class="message-box">${message}</div>
              </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>⚡ This email was routed securely via Resend from <strong>businessvolunteers.online</strong>.</p>
            <p>© ${new Date().getFullYear()} Business Volunteers · Founder-Led Agency Growth Infrastructure</p>
          </div>
        </div>
      </body>
      </html>
    `;

    if (!apiKey) {
      console.warn('⚠️ RESEND_API_KEY is not defined. Simulating email send for local/preview development:');
      console.log({
        to: receiverEmail,
        subject,
        lead: { name, email, phone, service, planName, growthGoal, message }
      });

      return res.status(200).json({
        success: true,
        message: 'Email processed in dev mode (RESEND_API_KEY missing).',
        preview: true
      });
    }

    const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from: 'Business Volunteers Leads <onboarding@resend.dev>',
      to: [receiverEmail],
      replyTo: email,
      subject: subject,
      html: htmlContent,
    });

    return res.status(200).json({
      success: true,
      message: 'Inquiry transmitted successfully. Our founders will respond within 2-4 hours.',
      data
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: error.message || 'Internal Server Error while dispatching notification.'
    });
  }
}
