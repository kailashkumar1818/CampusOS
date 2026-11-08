const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_USER !== 'smtp_user') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: Number(process.env.SMTP_PORT) || 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Development fallback mock transporter
  return {
    sendMail: async (options) => {
      console.log('-----------------------------------------');
      console.log('📧 [MOCK EMAIL SENT]');
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Text / Body: ${options.text || options.html}`);
      console.log('-----------------------------------------');
      return { messageId: `mock-${Date.now()}` };
    },
  };
};

const transporter = createTransporter();

const sendEmail = async ({ to, subject, html, text }) => {
  const from = process.env.FROM_EMAIL || 'CampusOS <noreply@campusos.edu>';
  return transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });
};

module.exports = {
  sendEmail,
};

