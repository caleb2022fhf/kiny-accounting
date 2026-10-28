import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, amount } = body;

    if (!phone || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Nyamuneka shyiramo nimero n'amafaranga biyazwi.' },
        { status: 400 }
      );
    }

    console.log(`[API LOG] Deposit Request: ${amount} RWF for ${phone}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Ubusabe bwo kubitsa bwoherejwe neza.',
        transactionId: `TXN-${Date.now()}`
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Habaye ikosa kuri Server.' },
      { status: 500 }
    );
  }
}