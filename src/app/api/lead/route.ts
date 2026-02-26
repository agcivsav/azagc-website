import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function sha256(val: string) {
  return crypto.createHash('sha256').update(val.trim().toLowerCase()).digest('hex')
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    first_name,
    last_name,
    email,
    company,
    member_type,
    phone,
    source,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    landing_page,
    referrer,
  } = body

  if (!first_name || !last_name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // ── 1. GoHighLevel ───────────────────────────────────────────────
  const ghlRes = await fetch(process.env.GHL_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: first_name,
      lastName: last_name,
      email,
      phone: phone || '',
      companyName: company || '',
      tags: [member_type || 'website-lead', source || 'website-form'],
      source: 'AZAGC Website',
      customField: {
        utm_source:   utm_source   || '',
        utm_medium:   utm_medium   || '',
        utm_campaign: utm_campaign || '',
        utm_content:  utm_content  || '',
        landing_page: landing_page || '',
        referrer:     referrer     || '',
        member_type:  member_type  || '',
      },
    }),
  })

  if (!ghlRes.ok) {
    console.error('[GHL] Failed:', await ghlRes.text())
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }

  // ── 2. Meta Conversions API (server-side) ────────────────────────
  if (process.env.META_PIXEL_ID && process.env.META_CAPI_TOKEN) {
    await fetch(
      `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name: 'Lead',
              event_time: Math.floor(Date.now() / 1000),
              event_source_url: landing_page,
              action_source: 'website',
              user_data: {
                em: [sha256(email)],
                fn: [sha256(first_name)],
                ln: [sha256(last_name)],
                ph: phone ? [sha256(phone.replace(/\D/g, ''))] : [],
              },
              custom_data: {
                content_name:     'Membership Inquiry',
                content_category: member_type,
                lead_source:      source,
              },
            },
          ],
          access_token: process.env.META_CAPI_TOKEN,
        }),
      }
    ).catch((err) => console.error('[Meta CAPI]', err))
  }

  return NextResponse.json({ success: true })
}
