import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/ghl-form
 * Accepts form submissions and forwards to GoHighLevel webhook
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const webhookUrl = process.env.GHL_WEBHOOK_URL

    if (!webhookUrl) {
      return NextResponse.json({ error: 'GHL webhook not configured' }, { status: 500 })
    }

    // Forward to GHL
    const ghlResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: body.firstName || '',
        lastName: body.lastName || '',
        email: body.email || '',
        phone: body.phone || '',
        message: body.message || '',
        source: body.source || 'website-form',
        tags: body.tags || ['website-lead'],
        timestamp: new Date().toISOString(),
      }),
    })

    if (!ghlResponse.ok) {
      throw new Error(`GHL returned ${ghlResponse.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[GHL Form API]', err)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
