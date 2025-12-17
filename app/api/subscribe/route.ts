import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed!' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Send welcome email
    await resend.emails.send({
      from: 'BadmintonLover <onboarding@resend.dev>', // Change this to your domain
      to: email,
      subject: 'Welcome to BadmintonLover! 🏸',
      html: `
        <h1>Welcome to BadmintonLover!</h1>
        <p>Thanks for joining our community of badminton enthusiasts!</p>
        <p>You'll receive:</p>
        <ul>
          <li>🏸 Expert reviews of the best badminton rackets for beginners</li>
          <li>💰 Exclusive deals (save 30-50% on quality rackets)</li>
          <li>📚 Comprehensive buying guides</li>
          <li>🎯 Training tips and techniques</li>
        </ul>
        <p>Your first newsletter is coming soon!</p>
        <p>Best regards,<br/>The BadmintonLover Team</p>
      `,
    });

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
