import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, amount } = await req.json()

  const response = await fetch('https://api.flutterwave.com/v3/payments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tx_ref: `tx-${Date.now()}`,
      amount,
      currency: 'NGN',
      redirect_url: 'http://localhost:3000/dashboard',
      payment_options: 'card,ussd,qr',
      customer: { email },
      customizations: { title: 'Symptom Checker Premium', description: 'Unlock premium features' },
    }),
  })

  const data = await response.json()
  return NextResponse.json(data)
}
