// subscribers/user.js
import { transporter, renderTemplate } from '../utils/email-transporter.js';
import { logger } from '../config/logger.js';
import config from '../config/config.js';

export const signUp = async ({ receiverEmail, verificationUrl }) => {
  try {
    const templateName = 'email_verification';
    const context = {
      user: {
        customName: 'User', // Adjust as needed, might be dynamic
      },
      verificationUrl,
    };

    const html = await renderTemplate(templateName, context);

    const mailOptions = {
      from: `Dawit Yenew <${config.email}>`,
      to: receiverEmail,
      subject: 'Email Verification',
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error('Error sending email:', error);
  }
};

export default { signup: signUp };
