// Africa's Talking SDK wrapper
// npm install africastalking
// Docs: developers.africastalking.com/docs/sms
import { envAny } from './env'

// Dynamic import keeps this server-only (AT SDK uses Node.js APIs)
async function getAT() {
  // @ts-expect-error - africastalking lacks TypeScript definitions
  const AfricasTalking = (await import('africastalking')).default
  return AfricasTalking({
    username: envAny('AT_USERNAME'),
    apiKey:   envAny('AT_API_KEY'),
  })
}

export async function notifyOwnerSMS(booking: {
  name: string; organisation: string; phone: string
  email: string; service: string; datetime?: string; notes?: string
}) {
  const at  = await getAT()
  const sms = at.SMS
  const msg =
    `[ErgoAfya NEW BOOKING]\n` +
    `Name: ${booking.name} | Org: ${booking.organisation}\n` +
    `Phone: ${booking.phone} | Email: ${booking.email}\n` +
    `Service: ${booking.service}\n` +
    `Time: ${booking.datetime || 'Flexible'}\n` +
    `Notes: ${booking.notes?.slice(0,80) || 'None'}`

  return sms.send({
    to:      [envAny('AT_OWNER_PHONE'), envAny('AT_OWNER_PHONE2')].filter(Boolean),
    from:    envAny('AT_SENDER_ID') || 'ErgoAfya',
    message: msg,
  })
}

export async function confirmClientSMS(phone: string, name: string, service: string) {
  const at  = await getAT()
  const sms = at.SMS
  return sms.send({
    to:      [phone],
    from:    envAny('AT_SENDER_ID') || 'ErgoAfya',
    message: `Hi ${name}! Your ErgoAfya booking for "${service}" is confirmed. We'll call/WhatsApp you within 24hrs. Questions? 0734251520`,
  })
}

export async function sendBulkSMS(phones: string[], message: string) {
  const at  = await getAT()
  const sms = at.SMS
  return sms.send({ to: phones, from: envAny('AT_SENDER_ID') || 'ErgoAfya', message })
}
