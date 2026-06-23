import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Pricing configuration
const PLAN_PRICES: Record<string, number> = {
  "standard": 599,
  "premium": 1199,
  "elite": 2999,
};

export async function POST(request: Request) {
  try {
    const { plan, couponCode } = await request.json();

    if (!plan || !PLAN_PRICES[plan]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    let originalPrice = PLAN_PRICES[plan];
    let finalPrice = originalPrice;
    let discountAmount = 0;

    // Apply Coupon Logic
    if (couponCode) {
      const code = couponCode.toUpperCase().trim();

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const backendRes = await fetch(`${apiUrl}/coupons/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ couponCode: code })
        });

        const data = await backendRes.json();

        if (data.success) {
          const type = data.type;
          const value = data.value !== undefined ? data.value : data.discountAmount;

          if (type === 'percentage') {
            discountAmount = Math.round(originalPrice * (value / 100));
          } else if (type === 'flat') {
            discountAmount = Math.round(value);
          } else if (data.discountAmount !== undefined) {
            discountAmount = data.discountAmount;
          }
          finalPrice = Math.max(originalPrice - discountAmount, 0); // Ensure price doesn't go negative
        } else {
          return NextResponse.json({ error: data.message || 'Invalid coupon code' }, { status: 400 });
        }
      } catch (error) {
        console.error("Coupon verification error during order creation:", error);
        return NextResponse.json({ error: 'Failed to verify coupon' }, { status: 500 });
      }
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    // Razorpay requires amount in subunits (paise)
    const amountInPaise = Math.round(finalPrice * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        plan: plan,
        couponApplied: couponCode || "None"
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order: order,
      originalPrice,
      finalPrice,
      discountAmount,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Razorpay Error:', error);
    return NextResponse.json({ error: error.message || 'Error creating Razorpay order' }, { status: 500 });
  }
}
