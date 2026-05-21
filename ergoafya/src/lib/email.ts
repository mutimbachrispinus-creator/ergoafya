// Nodemailer — sends formatted HTML email to owner on every booking
// Also sends confirmation email to client
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM!,
    pass: process.env.EMAIL_PASSWORD!, // Gmail App Password (not your login password)
  },
})
// For SendGrid instead, replace above with:
// const transporter = nodemailer.createTransport({
//   host: 'smtp.sendgrid.net', port: 587, secure: false,
//   auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY! }
// })

export async function emailOwnerBooking(booking: {
  name: string; organisation: string; phone: string; email: string
  service: string; datetime?: string; notes?: string; submittedAt: string
}) {
  return transporter.sendMail({
    from:    `"ErgoAfya Site" <${process.env.EMAIL_FROM}>`,
    to:      process.env.OWNER_EMAIL!,
    subject: `🟢 New Booking: ${booking.name} — ${booking.service}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #c8e6d8;border-radius:12px;overflow:hidden">
        <div style="background:#1d5c38;padding:20px 24px">
          <h2 style="color:#f6f2eb;margin:0;font-size:18px">🗓️ New ErgoAfya Booking</h2>
          <p style="color:#7ed4a6;margin:4px 0 0;font-size:13px">${booking.submittedAt}</p>
        </div>
        <div style="padding:24px;background:#f6f2eb">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${[
              ['Client Name', booking.name],
              ['Organisation', booking.organisation],
              ['Phone / WhatsApp', booking.phone],
              ['Email', booking.email],
              ['Service Requested', booking.service],
              ['Preferred Date/Time', booking.datetime || 'Flexible'],
              ['Notes', booking.notes || '—'],
            ].map(([label, val]) => `
              <tr>
                <td style="padding:8px 12px;background:#e8f5ee;font-weight:600;color:#1d5c38;border-bottom:1px solid #c8e6d8;width:40%">${label}</td>
                <td style="padding:8px 12px;color:#0f2318;border-bottom:1px solid #c8e6d8">${val}</td>
              </tr>`).join('')}
          </table>
          <div style="margin-top:20px;padding:14px;background:#fff;border-radius:8px;border-left:4px solid #4aac78">
            <p style="margin:0;font-size:13px;color:#4a6358">
              <strong>Quick reply:</strong> 
              <a href="https://wa.me/${booking.phone?.replace(/\D/g,'')}" style="color:#1d5c38">WhatsApp ${booking.name}</a> · 
              <a href="mailto:${booking.email}" style="color:#1d5c38">Email ${booking.name}</a>
            </p>
          </div>
        </div>
        <div style="background:#0f2318;padding:12px 24px;text-align:center">
          <p style="color:#4aac78;margin:0;font-size:12px">ErgoAfya Solutions · Upperhill, Nairobi · ergoafya@mail.com</p>
        </div>
      </div>
    `,
  })
}

export async function emailClientConfirmation(booking: {
  name: string; email: string; service: string
}) {
  return transporter.sendMail({
    from:    `"ErgoAfya Solutions" <${process.env.EMAIL_FROM}>`,
    to:      booking.email,
    subject: `✅ Booking Confirmed — ErgoAfya Solutions`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1d5c38;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#f6f2eb;margin:0;font-size:22px">ErgoAfya Solutions</h1>
          <p style="color:#7ed4a6;margin:4px 0 0;font-size:13px">Ergonomics & Occupational Health · Nairobi, Kenya</p>
        </div>
        <div style="padding:28px;background:#f6f2eb;border:1px solid #c8e6d8">
          <h2 style="color:#0f2318;margin:0 0 12px">Hi ${booking.name}, your booking is confirmed! 🎉</h2>
          <p style="color:#4a6358;line-height:1.7">Thank you for reaching out to ErgoAfya Solutions. We've received your request for <strong style="color:#1d5c38">${booking.service}</strong> and will confirm your appointment within <strong>24 hours</strong>.</p>
          <div style="background:#fff;border-radius:8px;padding:16px;margin:20px 0;border-left:4px solid #4aac78">
            <p style="margin:0 0 8px;font-weight:600;color:#0f2318">What happens next?</p>
            <ol style="margin:0;padding-left:16px;color:#4a6358;line-height:1.9;font-size:14px">
              <li>Our OT will review your request</li>
              <li>You'll receive a WhatsApp/call to confirm date & time</li>
              <li>We'll conduct the assessment at your location</li>
              <li>You'll receive a detailed report with recommendations</li>
            </ol>
          </div>
          <p style="color:#4a6358;font-size:14px">Need to reach us sooner?<br>
            📞 <a href="tel:+254712251520" style="color:#1d5c38">+254 712 251 520</a><br>
            💬 <a href="https://wa.me/254734251520" style="color:#1d5c38">WhatsApp: 0734 251 520</a><br>
            ✉️ <a href="mailto:ergoafya@mail.com" style="color:#1d5c38">ergoafya@mail.com</a>
          </p>
        </div>
        <div style="background:#0f2318;padding:12px 24px;text-align:center;border-radius:0 0 12px 12px">
          <p style="color:#4aac78;margin:0;font-size:12px">© 2026 ErgoAfya Solutions · Upperhill Gardens, 3rd Ngong Ave, Nairobi</p>
        </div>
      </div>
    `,
  })
}
