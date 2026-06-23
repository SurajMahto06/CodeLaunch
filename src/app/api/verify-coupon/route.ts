import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { couponCode, plan } = body;

    if (!couponCode) {
      return NextResponse.json(
        { success: false, message: "Coupon code is required." },
        { status: 400 }
      );
    }

    const PLAN_PRICES: Record<string, number> = {
      "standard": 599,
      "premium": 1199,
      "elite": 2999,
    };
    const originalPrice = plan && PLAN_PRICES[plan] ? PLAN_PRICES[plan] : 0;

    // Call the backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const backendRes = await fetch(`${apiUrl}/coupons/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ couponCode })
    });

    const data = await backendRes.json();

    if (data.success) {
      const type = data.type;
      const value = data.value !== undefined ? data.value : data.discountAmount;
      let discountAmount = 0;
      
      if (type === 'percentage') {
        discountAmount = Math.round(originalPrice * (value / 100));
      } else if (type === 'flat') {
        discountAmount = Math.round(value);
      } else if (data.discountAmount !== undefined) {
        discountAmount = data.discountAmount;
      }

      return NextResponse.json({
        success: true,
        discountAmount: discountAmount,
        type: type,
        message: data.message || "Coupon applied successfully"
      });
    } else {
      return NextResponse.json(
        { success: false, message: data.message || "Invalid or expired coupon code." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Coupon verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

