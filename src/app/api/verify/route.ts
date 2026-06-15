import { NextResponse } from 'next/server';
import certificates from '@/data/certificates.json';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const searchId = id.trim().toUpperCase();

    // Find the certificate in the JSON file
    const certificate = certificates.find((cert) => cert.id.toUpperCase() === searchId);

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    // Return the certificate details
    return NextResponse.json({ success: true, certificate }, { status: 200 });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
