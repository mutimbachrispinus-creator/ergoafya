import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const Schema = z.object({
  firstName:    z.string().min(2),
  lastName:     z.string().min(2),
  organisation: z.string().min(2),
  email:        z.string().email(),
  phone:        z.string().min(9),
  service:      z.string().min(3),
  datetime:     z.string().optional(),
  notes:        z.string().max(800).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = Schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const d = parsed.data
    const booking = {
      name:         `${d.firstName} ${d.lastName}`,
      organisation: d.organisation,
      phone:        d.phone,
      email:        d.email,
      service:      d.service,
      datetime:     d.datetime || 'Flexible',
      notes:        d.notes   || '',
      submittedAt:  new Date().toISOString(),
      status:       'pending',
      source:       'website',
    }

    // ── 1. Save to Firestore (server-side)
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_ADMIN_PROJECT_ID) {
      try {
        const { getDb } = await import('@/lib/firebase')
        const db = getDb()
        // @ts-ignore
        const { collection, addDoc } = await import('firebase/firestore/lite')
        await addDoc(collection(db, 'bookings'), booking)
      } catch (e) { console.warn('Firestore write failed:', e) }
    }

    // ── 2. Africa's Talking SMS to owner + client
    if (process.env.AT_API_KEY) {
      try {
        const { notifyOwnerSMS, confirmClientSMS } = await import('@/lib/africastalking')
        await Promise.allSettled([
          notifyOwnerSMS(booking),
          confirmClientSMS(d.phone, booking.name, d.service),
        ])
      } catch (e) { console.warn('AT SMS failed:', e) }
    }

    // ── 3. Email notifications
    if (process.env.EMAIL_FROM) {
      try {
        const { emailOwnerBooking, emailClientConfirmation } = await import('@/lib/email')
        await Promise.allSettled([
          emailOwnerBooking(booking),
          emailClientConfirmation({ name: booking.name, email: d.email, service: d.service }),
        ])
      } catch (e) { console.warn('Email failed:', e) }
    }

    // ── 4. CallMeBot WhatsApp (free, no SDK needed)
    if (process.env.CALLMEBOT_API_KEY) {
      const msg = encodeURIComponent(`[ErgoAfya] New booking: ${booking.name} — ${d.service} — ${d.phone}`)
      const num = process.env.AT_OWNER_PHONE?.replace(/\D/g,'')
      fetch(`https://api.callmebot.com/whatsapp.php?phone=${num}&text=${msg}&apikey=${process.env.CALLMEBOT_API_KEY}`)
        .catch(()=>null)
    }

    return NextResponse.json({
      success: true,
      message: 'Booking received! You will be contacted within 24 hours via SMS, WhatsApp, and email.',
    })
  } catch (err: any) {
    console.error('Booking API error:', err)
    return NextResponse.json({ error: 'Booking failed. Please try WhatsApp or phone directly.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ErgoAfya Booking API is live', version: '1.0' })
}
