// utils/emailTemplates.ts

/**
 * Generate password reset email template
 */
export const getPasswordResetTemplate = (
  name: string, 
  resetLink: string, 
  supportEmail: string = 'support@tailormanagement.com'
): string => {
  const currentYear = new Date().getFullYear();
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Tailor Management System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            width: 100%;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            padding: 30px 20px;
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .header p {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .body {
            padding: 30px;
            color: #333333;
        }
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #555555;
            margin-bottom: 25px;
            line-height: 1.6;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            transition: all 0.3s ease;
        }
        .reset-button:hover {
            background: linear-gradient(135deg, #218838 0%, #1aa179 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
        }
        .link-text {
            text-align: center;
            font-size: 14px;
            color: #666666;
            margin: 20px 0;
        }
        .alternative-link {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e9ecef;
            margin: 20px 0;
            word-break: break-all;
            text-align: center;
            font-size: 14px;
        }
        .alternative-link a {
            color: #007bff;
            text-decoration: none;
        }
        .security-notice {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 25px 0;
            text-align: center;
        }
        .security-notice p {
            margin: 0;
            color: #856404;
            font-size: 14px;
            font-weight: 500;
        }
        .footer {
            background-color: #2c3e50;
            padding: 30px 20px;
            color: white;
            text-align: center;
        }
        .support-info {
            margin-bottom: 20px;
        }
        .support-info a {
            color: #20c997;
            text-decoration: none;
            font-weight: 600;
        }
        .social {
            margin: 20px 0;
        }
        .social a {
            display: inline-block;
            margin: 0 10px;
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
        }
        .disclaimer {
            font-size: 12px;
            color: #adb5bd;
            line-height: 1.5;
            margin-top: 20px;
        }
        @media (max-width: 768px) {
            .container {
                width: 95%;
                margin: 10px auto;
            }
            .body {
                padding: 20px;
            }
            .reset-button {
                padding: 14px 30px;
                font-size: 16px;
            }
            .header h1 {
                font-size: 24px;
            }
            .greeting {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <h1>Password Reset Request</h1>
            <p>Tailor Management System</p>
        </div>

        <!-- Email Body Section -->
        <div class="body">
            <div class="greeting">Hello ${name},</div>
            
            <div class="message">
                You recently requested to reset your password for your Tailor Management System account. 
                Click the button below to create a new secure password.
            </div>

            <!-- Reset Button -->
            <div class="button-container">
                <a href="${resetLink}" class="reset-button" target="_blank">
                    Reset Password
                </a>
            </div>

            <div class="link-text">
                Or copy and paste this link into your browser:
            </div>

            <div class="alternative-link">
                <a href="${resetLink}" target="_blank">${resetLink}</a>
            </div>

            <!-- Security Notice -->
            <div class="security-notice">
                <p>⚠️ This link will expire in 1 hour for security reasons. Do not share this email with anyone.</p>
            </div>

            <div class="message">
                If you didn't request this password reset, please ignore this email. Your account remains secure.
                If you have any concerns, contact our support team immediately.
            </div>
        </div>

        <!-- Footer Section -->
        <div class="footer">
            <div class="support-info">
                Need help? Contact our support team at <a href="mailto:${supportEmail}">${supportEmail}</a>
            </div>

            <!-- Social Media Links -->
            <div class="social">
                <a href="https://facebook.com/tailormanagement" target="_blank">Facebook</a>
                <a href="https://twitter.com/tailormanagement" target="_blank">Twitter</a>
                <a href="https://instagram.com/tailormanagement" target="_blank">Instagram</a>
            </div>

            <!-- Disclaimer -->
            <div class="disclaimer">
                <p>This email was sent from Tailor Management System</p>
                <p>© ${currentYear} Tailor Management System. All rights reserved.</p>
                <p>This is an automated message. Please do not reply to this email.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

/**
 * Generate welcome email template
 */
export const getWelcomeTemplate = (
  name: string, 
  loginLink: string, 
  supportEmail: string = 'support@tailormanagement.com'
): string => {
  const currentYear = new Date().getFullYear();
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome - Tailor Management System</title>
    <style>
        /* Reuse most styles from password reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            width: 100%;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            padding: 30px 20px;
            background: linear-gradient(135deg, #6f42c1 0%, #6610f2 100%);
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .header p {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .body {
            padding: 30px;
            color: #333333;
        }
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #555555;
            margin-bottom: 25px;
            line-height: 1.6;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .login-button {
            display: inline-block;
            background: linear-gradient(135deg, #fd7e14 0%, #ff9900 100%);
            color: white;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            box-shadow: 0 4px 15px rgba(253, 126, 20, 0.3);
            transition: all 0.3s ease;
        }
        .login-button:hover {
            background: linear-gradient(135deg, #e66407 0%, #ff8800 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(253, 126, 20, 0.4);
        }
        .features {
            margin: 30px 0;
        }
        .feature-item {
            margin: 15px 0;
            padding-left: 25px;
            position: relative;
        }
        .feature-item:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #28a745;
            font-weight: bold;
        }
        .footer {
            background-color: #2c3e50;
            padding: 30px 20px;
            color: white;
            text-align: center;
        }
        .support-info {
            margin-bottom: 20px;
        }
        .support-info a {
            color: #20c997;
            text-decoration: none;
            font-weight: 600;
        }
        .social {
            margin: 20px 0;
        }
        .social a {
            display: inline-block;
            margin: 0 10px;
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
        }
        .disclaimer {
            font-size: 12px;
            color: #adb5bd;
            line-height: 1.5;
            margin-top: 20px;
        }
        @media (max-width: 768px) {
            .container {
                width: 95%;
                margin: 10px auto;
            }
            .body {
                padding: 20px;
            }
            .login-button {
                padding: 14px 30px;
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <h1>Welcome to Tailor Management System!</h1>
            <p>Your complete tailoring business solution</p>
        </div>

        <!-- Email Body Section -->
        <div class="body">
            <div class="greeting">Hello ${name},</div>
            
            <div class="message">
                Welcome to Tailor Management System! Your account has been successfully created 
                and you're now ready to streamline your tailoring business operations.
            </div>

            <!-- Login Button -->
            <div class="button-container">
                <a href="${loginLink}" class="login-button" target="_blank">
                    Login to Your Account
                </a>
            </div>

            <div class="features">
                <div class="message">Get started with these powerful features:</div>
                <div class="feature-item">Manage client orders and measurements</div>
                <div class="feature-item">Track order progress and deadlines</div>
                <div class="feature-item">Generate invoices and receipts</div>
                <div class="feature-item">Maintain customer database</div>
                <div class="feature-item">Analyze business performance</div>
            </div>

            <div class="message">
                We're excited to help you grow your tailoring business and provide 
                exceptional service to your customers.
            </div>
        </div>

        <!-- Footer Section -->
        <div class="footer">
            <div class="support-info">
                Need help getting started? Contact us at <a href="mailto:${supportEmail}">${supportEmail}</a>
            </div>

            <div class="social">
                <a href="https://facebook.com/tailormanagement" target="_blank">Facebook</a>
                <a href="https://twitter.com/tailormanagement" target="_blank">Twitter</a>
                <a href="https://instagram.com/tailormanagement" target="_blank">Instagram</a>
            </div>

            <div class="disclaimer">
                <p>© ${currentYear} Tailor Management System. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

/**
 * Generate text version for password reset email
 */
export const getPasswordResetText = (name: string, resetLink: string, supportEmail: string): string => {
  return `
Password Reset Request - Tailor Management System

Hello ${name},

You requested to reset your password for your Tailor Management System account.

To reset your password, click the following link:
${resetLink}

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email. Your account remains secure.

If you need assistance, contact our support team at: ${supportEmail}

---
Tailor Management System
This is an automated message. Please do not reply to this email.
  `.trim();
};

/**
 * Generate text version for welcome email
 */
export const getWelcomeText = (name: string, loginLink: string, supportEmail: string): string => {
  return `
Welcome to Tailor Management System!

Hello ${name},

Welcome to Tailor Management System! Your account has been successfully created.

Login to your account: ${loginLink}

Features:
- Manage client orders and measurements
- Track order progress and deadlines
- Generate invoices and receipts
- Maintain customer database
- Analyze business performance

Need help getting started? Contact us at: ${supportEmail}

---
Tailor Management System
  `.trim();
};

// Export all functions
export default {
  getPasswordResetTemplate,
  getWelcomeTemplate,
  getPasswordResetText,
  getWelcomeText
};