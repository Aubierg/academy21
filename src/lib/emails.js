const transporter = require('./mailer');

exports.sendConfirmationEmail = async ({ to, name, amount, method, title }) => {
  await transporter.sendMail({
    from: `"ATO Paris" <${process.env.MAIL_FROM}>`,
    to,
    subject: '✅ Confirmation de votre paiement — ATO Paris',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #C8A951;">ATO Paris</h1>
          <h2 style="color: #1A1A2E;">Academy Twenty One</h2>
        </div>
        <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h3>Bonjour ${name} 👋</h3>
          <p>Votre paiement a bien été reçu. Merci pour votre confiance !</p>
          <div style="background: #1A1A2E; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Formation :</strong> ${title}</p>
            <p><strong>Montant :</strong> ${amount} €</p>
            <p><strong>Méthode :</strong> ${method === 'stripe' ? 'Carte bancaire' : 'PayPal'}</p>
          </div>
          <p>Vous pouvez accéder à votre espace membre dès maintenant.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/espace-membre" 
               style="background: #C8A951; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold;">
              Accéder à mon espace membre
            </a>
          </div>
        </div>
        <div style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
          <p>ATO Paris © 2026 — Academy Twenty One</p>
        </div>
      </div>
    `
  });
};