import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { id, botCheck } = await request.json();

    // Honeypot check - if filled out, it's a bot
    if (botCheck) {
      return NextResponse.json({ success: true, certificate: null, message: "Verification completed." }, { status: 200 });
    }

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const searchId = id.trim().toUpperCase();

    // Call the real backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

    let backendCert;
    try {
      const response = await axios.get(`${apiUrl}/certificates/verify/${searchId}`);
      backendCert = response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to verify certificate' }, { status: 500 });
    }

    // Map backend data to frontend expected structure
    const certificate = {
      id: backendCert.certificateId,
      studentName: backendCert.student?.name || 'Unknown Student',
      role: backendCert.course?.title || 'Unknown Course',
      duration: backendCert.duration || "Self-Paced Track",
      issueDate: new Date(backendCert.issueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      credentialUrl: `${process.env.APP_URL || 'http://localhost:3000'}/verify?id=${backendCert.certificateId}`
    };

    // Return the certificate details
    return NextResponse.json({ success: true, certificate }, { status: 200 });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
