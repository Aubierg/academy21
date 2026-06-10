const sgMail = require('@sendgrid/mail');
if (!process.env.SENDGRID_API_KEY) {
  console.warn('⚠️  SENDGRID_API_KEY manquant');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid initialisé');
}
module.exports = {
  sendMail: async (options) => {
    if (!process.env.SENDGRID_API_KEY) throw new Error('SENDGRID_API_KEY manquant');
    try {
      const result = await sgMail.send({ to: options.to, from: options.from, subject: options.subject, html: options.html });
      console.log(`📧 Email envoyé à ${options.to} — statut ${result[0].statusCode}`);
      return result;
    } catch (error) {
      const code = error.code;
      const msg = error.response?.body?.errors?.[0]?.message || error.message;
      if (code === 401) console.error('❌ SendGrid: clé API invalide');
      if (code === 403) console.error('❌ SendGrid: sender non vérifié sur app.sendgrid.com');
      throw new Error(`SendGrid (${code}): ${msg}`);
    }
  }
};
