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
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const {
      name,
      email,
      phone,
      message,
      planName,
      growthGoal,
      website,
      formType,
      service,
      amount,
      paymentMethod,
      utrNumber,
    } = body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required fields.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.RECEIVER_EMAIL || MAIN_RECEIVER_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Business Volunteers Leads <onboarding@resend.dev>';

    const isPayment = formType === 'payment' || !!utrNumber;
    const isStrategy = formType === 'strategy' || !!planName || !!growthGoal;

    let badgeLabel = 'Direct Inquiry';
    let subject = `📩 New Contact Inquiry from ${name} - Business Volunteers`;

    if (isPayment) {
      badgeLabel = '⚡ Payment UTR Verification';
      subject = `💳 Payment Verification: ₹${amount || 'N/A'} from ${name} (UTR: ${utrNumber || 'N/A'})`;
    } else if (isStrategy) {
      badgeLabel = 'Growth Strategy Session';
      subject = `🚀 New Strategy Booking: ${name} (${planName || 'General Strategy'})`;
    } else if (service) {
      badgeLabel = `Service Request: ${service}`;
      subject = `🎯 Service Inquiry: ${service} from ${name}`;
    }

    // Clean phone number and generate WhatsApp quick reply URL for founders
    const cleanPhone = phone ? phone.replace(/[^\d+]/g, '').replace(/^0+/, '') : '';
    const waPhone = cleanPhone.startsWith('+')
      ? cleanPhone.replace('+', '')
      : (cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone);
    const waReplyUrl = waPhone
      ? `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${name}, thank you for reaching out to Business Volunteers!`)}`
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 32px 28px; text-align: center; }
          .header h1 { margin: 8px 0 0 0; font-size: 22px; font-weight: 900; letter-spacing: -0.02em; color: #ffffff; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: #94a3b8; }
          .badge { display: inline-block; background: #ff4e27; color: #ffffff; padding: 4px 14px; border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
          .content { padding: 32px 28px; }
          .data-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          .data-table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }
          .data-table tr:last-child td { border-bottom: none; }
          .label { font-weight: 700; color: #64748b; width: 150px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.03em; }
          .value { color: #0f172a; font-weight: 600; }
          .message-box { background: #f8fafc; border-left: 4px solid #ff4e27; padding: 18px; border-radius: 0 10px 10px 0; margin-top: 14px; font-size: 14px; line-height: 1.65; color: #334155; white-space: pre-wrap; word-break: break-word; }
          .actions { margin-top: 26px; padding: 18px; background: #fafaf9; border-radius: 12px; border: 1px dashed #cbd5e1; text-align: center; }
          .btn-wa { display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 999px; font-weight: 800; font-size: 13px; margin: 4px; }
          .btn-mail { display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 999px; font-weight: 800; font-size: 13px; margin: 4px; }
          .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">${badgeLabel}</span>
            <h1>Business Volunteers Lead Notification</h1>
            <p>New request submitted via businessvolunteers.online</p>
          </div>
          <div class="content">
            <table class="data-table">
              <tr>
                <td class="label">Full Name</td>
                <td class="value"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${email}" style="color: #ff4e27; text-decoration: none; font-weight: 700;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td class="label">Phone / WhatsApp</td>
                <td class="value"><a href="tel:${phone}" style="color: #0f172a; text-decoration: none; font-weight: 700;">${phone}</a></td>
              </tr>` : ''}
              ${service ? `
              <tr>
                <td class="label">Service Required</td>
                <td class="value"><strong style="color: #ff4e27;">${service}</strong></td>
              </tr>` : ''}
              ${amount ? `
              <tr>
                <td class="label">Amount Paid</td>
                <td class="value"><strong style="color: #16a34a; font-size: 16px;">₹${amount}</strong></td>
              </tr>` : ''}
              ${paymentMethod ? `
              <tr>
                <td class="label">Payment Mode</td>
                <td class="value"><strong>${paymentMethod}</strong></td>
              </tr>` : ''}
              ${utrNumber ? `
              <tr>
                <td class="label">UTR / Reference ID</td>
                <td class="value"><span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 6px; font-family: monospace; font-weight: 700;">${utrNumber}</span></td>
              </tr>` : ''}
              ${website ? `
              <tr>
                <td class="label">Website / URL</td>
                <td class="value"><a href="${website.startsWith('http') ? website : `https://${website}`}" target="_blank" rel="noopener" style="color: #0284c7; text-decoration: underline;">${website}</a></td>
              </tr>` : ''}
              ${planName ? `
              <tr>
                <td class="label">Plan / Topic</td>
                <td class="value"><span style="background: #fff1ee; color: #ff4e27; padding: 3px 10px; border-radius: 6px; font-weight: 800;">${planName}</span></td>
              </tr>` : ''}
              ${growthGoal ? `
              <tr>
                <td class="label">Growth Goal</td>
                <td class="value"><strong>${growthGoal}</strong></td>
              </tr>` : ''}
            </table>

            ${message ? `
              <div style="margin-top: 24px;">
                <span class="label" style="display: block; margin-bottom: 8px;">Detailed Client Requirements:</span>
                <div class="message-box">${message}</div>
              </div>
            ` : ''}

            <div class="actions">
              <span style="display: block; font-size: 12px; color: #64748b; font-weight: 700; margin-bottom: 10px; text-transform: uppercase;">Instant Lead Reply Actions</span>
              ${waReplyUrl ? `<a href="${waReplyUrl}" class="btn-wa" target="_blank" rel="noopener">💬 Reply on WhatsApp</a>` : ''}
              <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Your inquiry with Business Volunteers`)}" class="btn-mail">✉️ Reply via Email</a>
            </div>
          </div>
          <div class="footer">
            <p>⚡ This email was routed securely via Resend API from <strong>businessvolunteers.online</strong>.</p>
            <p>© ${new Date().getFullYear()} Business Volunteers · Founder-Led Agency Infrastructure</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Local development fallback when RESEND_API_KEY is not defined
    if (!apiKey) {
      console.warn('⚠️ RESEND_API_KEY is not defined. Simulating Resend dispatch for local development:');
      console.log({
        to: receiverEmail,
        from: fromEmail,
        subject,
        lead: { name, email, phone, service, planName, growthGoal, amount, utrNumber, message },
      });

      return res.status(200).json({
        success: true,
        preview: true,
        message: 'Resend simulation completed (RESEND_API_KEY is missing in current environment).',
        id: `sim_${Date.now()}`
      });
    }

    const resend = new Resend(apiKey);

    // Primary Dispatch: Lead Notification to Agency Founders
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [receiverEmail],
      replyTo: email,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error('❌ Resend API Dispatch Error:', error);

      let userFriendlyError = error.message || 'Failed to dispatch email via Resend.';
      if (error.message?.includes('testing emails to your own email address')) {
        userFriendlyError = `Resend Test Account Notice: Free onboarding sender can only send to your verified Resend account email. Please verify your domain at resend.com/domains or set RECEIVER_EMAIL to your Resend signup address.`;
      }

      return res.status(error.statusCode || 400).json({
        success: false,
        error: userFriendlyError,
        details: error
      });
    }

    // Optional Non-blocking Client Confirmation Auto-Reply
    // (Only executed when a custom verified domain is used, not the test onboarding@resend.dev)
    if (fromEmail && !fromEmail.includes('resend.dev')) {
      const clientConfirmationHtml = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
          <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
            <h2 style="color: #ff4e27; margin-top: 0;">Thank You for Contacting Business Volunteers!</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>We have successfully received your request for <strong>${service || planName || (isPayment ? 'Payment Verification' : 'Agency Consultation')}</strong>.</p>
            <p>Our senior strategy partners review all incoming submissions and will reach out to you within <strong>2 to 4 business hours</strong>.</p>
            <div style="margin: 24px 0; padding: 16px; background: #f1f5f9; border-radius: 10px; font-size: 14px;">
              <strong>Your Submission Summary:</strong><br>
              • Name: ${name}<br>
              • Email: ${email}<br>
              ${phone ? `• Phone: ${phone}<br>` : ''}
              ${service ? `• Service: ${service}<br>` : ''}
              ${planName ? `• Plan: ${planName}<br>` : ''}
              ${utrNumber ? `• UTR Ref: ${utrNumber}<br>` : ''}
            </div>
            <p style="font-size: 14px; color: #475569;">Need immediate assistance? You can also message us directly on WhatsApp at <a href="https://wa.me/918586989832" style="color: #ff4e27; font-weight: bold;">+91 8586989832</a>.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">Business Volunteers · AI-Powered Performance Marketing Agency · Delhi NCR, India</p>
          </div>
        </body>
        </html>
      `;

      try {
        await resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: isStrategy
            ? `Confirmed: We've Received Your Strategy Booking - Business Volunteers`
            : isPayment
            ? `Received: Your Payment Verification Submission - Business Volunteers`
            : `We've Received Your Request - Business Volunteers`,
          html: clientConfirmationHtml,
        });
      } catch (autoReplyErr) {
        console.warn('⚠️ Client auto-reply note:', autoReplyErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry transmitted successfully. Our founders will respond within 2-4 hours.',
      id: data?.id,
      data
    });
  } catch (error: any) {
    console.error('Fatal send-email handler exception:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error while dispatching notification.'
    });
  }
}

