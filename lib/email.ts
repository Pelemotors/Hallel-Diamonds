import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Generic email sending function that supports both Resend and SMTP
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Try Resend first (recommended)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
        });

        if (error) {
          console.error('Resend error:', error);
          // Fall through to SMTP
        } else {
          console.log('Email sent via Resend:', data);
          return true;
        }
      } catch (resendError) {
        console.error('Resend failed, trying SMTP:', resendError);
        // Fall through to SMTP
      }
    }

    // Fallback to SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ''),
      });

      console.log('Email sent via SMTP');
      return true;
    }

    console.warn('No email service configured (RESEND_API_KEY or SMTP_* required)');
    return false;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}
