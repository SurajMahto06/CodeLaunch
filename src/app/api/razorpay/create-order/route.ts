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

      if (code === 'FLAT20') {
        // 20% Off
        discountAmount = originalPrice * 0.20;
        finalPrice = originalPrice - discountAmount;
      } else if (code === 'CODE100') {
        // Flat Rs 100 Off
        discountAmount = 100;
        finalPrice = Math.max(originalPrice - discountAmount, 0); // Ensure price doesn't go negative
      } else {
        return NextResponse.json({ error: 'Invalid coupon code' }, { status: 400 });
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
