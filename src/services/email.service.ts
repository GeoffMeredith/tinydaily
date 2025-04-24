import crypto from 'crypto';
import { sendEmail } from '../utils/email';
import { renderTemplate } from './template.service';

export const generateVerificationToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
};

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;
    
    const html = renderTemplate('verification', { verificationUrl });
    
    await sendEmail({
        to: email,
        subject: 'Verify your email for TinyDaily',
        message: `
Welcome to TinyDaily!

Please click the link below to verify your email address and confirm your subscription to our daily messages:
${verificationUrl}

If you did not request this subscription, please ignore this email.
        `,
        html
    });
}; 