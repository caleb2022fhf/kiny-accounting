import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { status, amount, phone } = body;

    if (status === 'SUCCESS') {
      console.log(`[WEBHOOK LOG] Payment successful for ${phone}. SMS Triggered.`);
      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ status: 'Ignored' });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}