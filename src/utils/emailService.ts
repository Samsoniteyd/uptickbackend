import nodemailer from 'nodemailer';
import { createTransport, Transporter } from 'nodemailer';
import { render } from '@react-email/render';
import PasswordResetEmail from '../emails/passwordResetEmail';
import { getPasswordResetTemplate } from '../utils/emailTemplates';
// Email configuration interface
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Email options interface
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: Transporter;
  private fromEmail: string;

  constructor() {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Email configuration is missing');
    }

    const config: EmailConfig = {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };

    this.transporter = createTransport(config);
    this.fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  }

  /**
   * Verify email configuration
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email server connection verified');
      return true;
    } catch (error) {
      console.error('Email server connection failed:', error);
      return false;
    }
  }

  /**
   * Send password reset email
   */
 async sendPasswordResetEmail(email: string, resetToken: string, name: string): Promise<void> {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const supportEmail = process.env.SUPPORT_EMAIL || this.fromEmail;

    // Directly use the HTML template
    const html = getPasswordResetTemplate(name, resetLink, supportEmail);

    const mailOptions: EmailOptions = {
      from: `Tailor Management System <${this.fromEmail}>`,
      to: email,
      subject: 'Password Reset Request - Tailor Management System',
      html,
    };

    await this.sendEmail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
    
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      const loginLink = `${process.env.FRONTEND_URL}/login`;
      
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #007bff; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; }
                .button { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to Tailor Management System!</h1>
                </div>
                <div class="content">
                    <h2>Hello ${name},</h2>
                    <p>Your account has been successfully created.</p>
                    <p>You can now log in to start managing your tailoring business efficiently.</p>
                    <p style="text-align: center;">
                        <a href="${loginLink}" class="button">Login to Your Account</a>
                    </p>
                    <p>If you have any questions, please contact our support team.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Tailor Management System. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `;

      const mailOptions: EmailOptions = {
        from: `Tailor Management System <${this.fromEmail}>`,
        to: email,
        subject: 'Welcome to Tailor Management System',
        html,
      };

      await this.sendEmail(mailOptions);
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Don't throw error for welcome email as it's not critical
    }
  }

  /**
   * Send generic email
   */
  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const result = await this.transporter.sendMail({
        ...options,
        from: options.from || this.fromEmail,
      });

      console.log('Email sent successfully:', result.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  /**
   * Fallback password reset template
   */
  private getPasswordResetTemplate(name: string, resetLink: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; }
              .button { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
              .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 5px; margin: 15px 0; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                  <h2>Hello ${name},</h2>
                  <p>You requested to reset your password for your Tailor Management System account.</p>
                  
                  <div class="warning">
                      <strong>Important:</strong> This link will expire in 1 hour for security reasons.
                  </div>

                  <p style="text-align: center;">
                      <a href="${resetLink}" class="button">Reset Your Password</a>
                  </p>

                  <p>If the button doesn't work, copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; color: #007bff;">${resetLink}</p>

                  <p>If you didn't request this password reset, please ignore this email. Your account remains secure.</p>
                  
                  <p>Need help? Contact our support team at <a href="mailto:${process.env.SUPPORT_EMAIL || this.fromEmail}">${process.env.SUPPORT_EMAIL || this.fromEmail}</a></p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 Tailor Management System. All rights reserved.</p>
                  <p>This is an automated message, please do not reply to this email.</p>
              </div>
          </div>
      </body>
      </html>
    `;
  }
}

// Create singleton instance
const emailService = new EmailService();

// Export individual functions for convenience
export const sendPasswordResetEmail = (email: string, resetToken: string, name: string): Promise<void> => {
  return emailService.sendPasswordResetEmail(email, resetToken, name);
};

export const sendWelcomeEmail = (email: string, name: string): Promise<void> => {
  return emailService.sendWelcomeEmail(email, name);
};

export const verifyEmailConnection = (): Promise<boolean> => {
  return emailService.verifyConnection();
};

export default emailService;