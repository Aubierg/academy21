const transporter = require('./mailer');

exports.sendConfirmationEmail = async ({ to, name, amount, method, title, isAdminNotif, clientInfo }) => {
  if (isAdminNotif && clientInfo) {
    await transporter.sendMail({
      from: `"Academy 21 Paris" <${process.env.MAIL_FROM}>`,
      to,
      subject: '🔔 Nouvelle inscription — ' + title,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;">
          <div style="background:#C8102E;padding:20px;text-align:center;">
            <h1 style="color:white;margin:0;">🔔 Nouvelle inscription</h1>
          </div>
          <div style="padding:24px;background:#f9f9f9;">
            <h3>Un client vient de payer !</h3>
            <div style="background:white;border-left:4px solid #C8102E;padding:16px;margin:16px 0;">
              <p style="margin:6px 0;"><strong>Prénom :</strong> ${clientInfo.prenom || 'N/A'}</p>
              <p style="margin:6px 0;"><strong>Nom :</strong> ${clientInfo.nom || 'N/A'}</p>
              <p style="margin:6px 0;"><strong>Email :</strong> ${clientInfo.email || 'N/A'}</p>
              <p style="margin:6px 0;"><strong>Téléphone :</strong> ${clientInfo.telephone || 'N/A'}</p>
            </div>
            <div style="background:#1a1a1a;color:white;padding:16px;border-radius:8px;">
              <p style="margin:6px 0;"><strong>Formation :</strong> ${title}</p>
              <p style="margin:6px 0;"><strong>Montant :</strong> ${amount} €</p>
              <p style="margin:6px 0;"><strong>Méthode :</strong> ${method === 'stripe' ? 'Carte (Stripe)' : 'PayPal'}</p>
            </div>
            <div style="background:#fff3cd;border:1px solid #ffc107;padding:14px;border-radius:8px;margin-top:16px;">
              <p style="color:#856404;font-weight:bold;margin:0 0 6px;">⚡ Action requise</p>
              <p style="color:#856404;margin:0;font-size:14px;">Envoyez les identifiants au client via POST /api/admin/send-credentials</p>
            </div>
          </div>
        </div>`
    });
  } else {
    await transporter.sendMail({
      from: `"Academy 21 Paris" <${process.env.MAIL_FROM}>`,
      to,
      subject: '✅ Paiement confirmé — ' + title,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;">
          <div style="background:#C8102E;padding:20px;text-align:center;">
            <h1 style="color:white;margin:0;">Academy 21 France</h1>
          </div>
          <div style="padding:24px;background:#f9f9f9;">
            <h3>Bonjour ${name} 👋</h3>
            <p>Votre paiement a bien été reçu !</p>
            <div style="background:#1a1a1a;color:white;padding:16px;border-radius:8px;margin:16px 0;">
              <p style="margin:6px 0;"><strong>Formation :</strong> ${title}</p>
              <p style="margin:6px 0;"><strong>Montant :</strong> ${amount} €</p>
              <p style="margin:6px 0;"><strong>Méthode :</strong> ${method === 'stripe' ? 'Carte bancaire' : 'PayPal'}</p>
            </div>
            <div style="background:white;border:1px solid #e0e2e6;border-radius:8px;padding:20px;">
              <p style="margin:0 0 10px;"><span style="background:#C8102E;color:white;border-radius:50%;padding:2px 8px;margin-right:8px;font-weight:bold;">1</span> Paiement reçu ✅</p>
              <p style="margin:0 0 10px;"><span style="background:#C8102E;color:white;border-radius:50%;padding:2px 8px;margin-right:8px;font-weight:bold;">2</span> Notre équipe prépare votre accès</p>
              <p style="margin:0;"><span style="background:#C8102E;color:white;border-radius:50%;padding:2px 8px;margin-right:8px;font-weight:bold;">3</span> Vous recevrez vos identifiants sous <strong>24h ouvrées</strong></p>
            </div>
            <p style="background:#fff5f5;border:1px solid rgba(200,16,46,0.2);padding:12px;border-radius:8px;font-size:13px;color:#555;margin-top:16px;">
              ℹ️ Ne créez pas de compte vous-même — vos identifiants vous seront envoyés par email.
            </p>
          </div>
        </div>`
    });
  }
};

exports.sendCredentialsEmail = async ({ to, prenom, nom, email, password, formationTitle }) => {
  await transporter.sendMail({
    from: `"Academy 21 Paris" <${process.env.MAIL_FROM}>`,
    to,
    subject: '🔑 Vos identifiants de connexion — Academy 21 France',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;">
        <div style="background:#C8102E;padding:20px;text-align:center;">
          <h1 style="color:white;margin:0;">Academy 21 France</h1>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">Vos identifiants de connexion</p>
        </div>
        <div style="padding:24px;background:#f9f9f9;">
          <h3>Bonjour ${prenom} ${nom} 👋</h3>
          <p>Votre accès est maintenant <strong>activé</strong> !</p>
          <div style="background:#1a1a1a;border-radius:8px;padding:20px;margin:20px 0;">
            <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Vos identifiants</p>
            <p style="color:white;margin:8px 0;"><strong>Email :</strong> <span style="font-family:monospace;">${email}</span></p>
            <p style="color:#C8102E;margin:8px 0;"><strong>Mot de passe :</strong> <span style="font-family:monospace;font-size:18px;font-weight:bold;">${password}</span></p>
          </div>
          ${formationTitle ? `<p style="border-left:4px solid #C8102E;padding:10px 14px;background:white;margin:16px 0;">🎓 <strong>Formation :</strong> ${formationTitle}</p>` : ''}
          <div style="text-align:center;margin:24px 0;">
            <a href="${process.env.FRONTEND_URL}/login" style="background:#C8102E;color:white;padding:14px 32px;text-decoration:none;border-radius:4px;font-weight:bold;font-size:14px;">
              Se connecter à mon espace
            </a>
          </div>
          <p style="background:#fff3cd;border:1px solid #ffc107;padding:12px;border-radius:8px;font-size:13px;color:#856404;">
            🔒 Changez votre mot de passe après votre première connexion.
          </p>
        </div>
        <div style="text-align:center;color:#999;font-size:12px;padding:16px;">
          Academy 21 France © 2026
        </div>
      </div>`
  });
};
