const transporter = require('./mailer');

exports.sendConfirmationEmail = async ({ to, name, amount, method, title, isAdminNotif, clientInfo }) => {

  if (isAdminNotif && clientInfo) {
    // ── EMAIL ADMIN ──
    await transporter.sendMail({
      from: `"Academy 21 France" <${process.env.MAIL_FROM}>`,
      to,
      subject: `🔔 Nouvelle inscription — ${title}`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nouvelle inscription</title></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#C8102E 0%,#8b0000 100%);padding:32px 40px;text-align:center;">
          <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-weight:900;font-size:28px;color:white;letter-spacing:-0.5px;">
            ACADEMY <span style="color:#f0a500;">21</span> FRANCE
          </div>
          <div style="color:rgba(255,255,255,0.7);font-size:13px;margin-top:6px;letter-spacing:2px;text-transform:uppercase;">Nouvelle Inscription</div>
        </td></tr>

        <!-- ALERTE -->
        <tr><td style="padding:32px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8e1;border:1px solid #ffe082;border-left:4px solid #f0a500;border-radius:8px;">
            <tr><td style="padding:16px 20px;">
              <div style="font-weight:800;font-size:15px;color:#856404;margin-bottom:4px;">🔔 Un client vient de s'inscrire !</div>
              <div style="font-size:13px;color:#856404;">Action requise — vérifiez les informations ci-dessous.</div>
            </td></tr>
          </table>
        </td></tr>

        <!-- INFOS CLIENT -->
        <tr><td style="padding:24px 40px 0;">
          <div style="font-weight:800;font-size:12px;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Informations client</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e2e6;border-radius:8px;overflow:hidden;">
            ${[
              ['👤 Prénom', clientInfo.prenom || 'N/A'],
              ['👤 Nom', clientInfo.nom || 'N/A'],
              ['✉️ Email', clientInfo.email || 'N/A'],
              ['📞 Téléphone', clientInfo.telephone || 'N/A'],
            ].map(([label, value], i) => `
            <tr style="background:${i % 2 === 0 ? 'white' : '#fafafa'};">
              <td style="padding:12px 16px;font-size:13px;color:#888;font-weight:600;width:140px;border-bottom:1px solid #f0f1f3;">${label}</td>
              <td style="padding:12px 16px;font-size:13px;color:#1a1a1a;font-weight:700;border-bottom:1px solid #f0f1f3;">${value}</td>
            </tr>`).join('')}
          </table>
        </td></tr>

        <!-- DÉTAILS PAIEMENT -->
        <tr><td style="padding:24px 40px 0;">
          <div style="font-weight:800;font-size:12px;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Détails du paiement</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1a1a,#2d2d2d);border-radius:8px;">
            <tr><td style="padding:20px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Formation</td>
                  <td style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;text-align:right;">Montant</td>
                </tr>
                <tr>
                  <td style="color:white;font-size:15px;font-weight:700;">${title}</td>
                  <td style="color:#f0a500;font-size:22px;font-weight:900;text-align:right;">${amount} €</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:12px;border-top:1px solid rgba(255,255,255,0.1);margin-top:12px;">
                    <span style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);font-size:11px;padding:3px 10px;border-radius:4px;font-weight:600;">
                      ${method === 'stripe' ? '💳 Carte bancaire (Stripe)' : '🅿️ PayPal'}
                    </span>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="padding:32px 40px;text-align:center;border-top:1px solid #f0f1f3;margin-top:24px;">
          <div style="font-size:12px;color:#aaa;">Academy 21 France · contact@academy21france.fr</div>
          <div style="font-size:11px;color:#ccc;margin-top:4px;">Cet email est envoyé automatiquement suite à un paiement.</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
    });

  } else {
    // ── EMAIL CLIENT ──
    await transporter.sendMail({
      from: `"Academy 21 France" <${process.env.MAIL_FROM}>`,
      to,
      subject: `✅ Confirmation de paiement — ${title}`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Confirmation</title></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#C8102E 0%,#8b0000 100%);padding:40px;text-align:center;">
          <div style="width:64px;height:64px;background:rgba(255,255,255,0.15);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;font-size:28px;">✅</div>
          <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-weight:900;font-size:28px;color:white;letter-spacing:-0.5px;">
            ACADEMY <span style="color:#f0a500;">21</span> FRANCE
          </div>
          <div style="color:rgba(255,255,255,0.8);font-size:15px;margin-top:8px;">Paiement confirmé avec succès</div>
        </td></tr>

        <!-- BONJOUR -->
        <tr><td style="padding:36px 40px 0;">
          <div style="font-size:22px;font-weight:800;color:#1a1a1a;margin-bottom:8px;">Bonjour ${name} 👋</div>
          <div style="font-size:15px;color:#666;line-height:1.7;">
            Votre paiement a bien été reçu. Vous pouvez dès maintenant accéder à votre formation depuis votre espace membre.
          </div>
        </td></tr>

        <!-- DÉTAILS -->
        <tr><td style="padding:24px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1a1a,#2d2d2d);border-radius:10px;">
            <tr><td style="padding:24px 28px;">
              <div style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px;">Récapitulatif</div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:rgba(255,255,255,0.6);font-size:13px;padding-bottom:10px;">📚 Formation</td>
                  <td style="color:white;font-size:13px;font-weight:700;text-align:right;padding-bottom:10px;">${title}</td>
                </tr>
                <tr>
                  <td style="color:rgba(255,255,255,0.6);font-size:13px;padding-bottom:10px;">💰 Montant</td>
                  <td style="color:#f0a500;font-size:20px;font-weight:900;text-align:right;padding-bottom:10px;">${amount} €</td>
                </tr>
                <tr>
                  <td style="color:rgba(255,255,255,0.6);font-size:13px;">💳 Méthode</td>
                  <td style="color:rgba(255,255,255,0.8);font-size:13px;font-weight:600;text-align:right;">${method === 'stripe' ? 'Carte bancaire' : 'PayPal'}</td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- ÉTAPES -->
        <tr><td style="padding:24px 40px 0;">
          <div style="font-weight:800;font-size:12px;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Prochaines étapes</div>
          ${[
            ['✅', 'Paiement reçu', 'Votre paiement a été confirmé avec succès.'],
            ['🔓', 'Accès activé', 'Votre accès à la formation est immédiatement disponible.'],
            ['🎓', 'Commencez', 'Connectez-vous et accédez à votre espace de formation.'],
          ].map(([icon, title, desc]) => `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
            <tr>
              <td style="width:44px;vertical-align:top;">
                <div style="width:36px;height:36px;background:#fff5f5;border-radius:50%;text-align:center;line-height:36px;font-size:16px;">${icon}</div>
              </td>
              <td style="vertical-align:top;padding-left:12px;">
                <div style="font-weight:800;font-size:14px;color:#1a1a1a;margin-bottom:2px;">${title}</div>
                <div style="font-size:13px;color:#888;line-height:1.5;">${desc}</div>
              </td>
            </tr>
          </table>`).join('')}
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:32px 40px;text-align:center;">
          <a href="${process.env.FRONTEND_URL}/dashboard" style="display:inline-block;background:linear-gradient(135deg,#C8102E,#8b0000);color:white;font-weight:800;font-size:15px;text-decoration:none;padding:16px 40px;border-radius:8px;letter-spacing:0.5px;box-shadow:0 4px 16px rgba(200,16,46,0.3);">
            Accéder à ma formation →
          </a>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#f7f8fa;padding:24px 40px;text-align:center;border-top:1px solid #e0e2e6;">
          <div style="font-size:13px;color:#888;margin-bottom:8px;">
            <strong style="color:#1a1a1a;">Academy 21 France</strong> · contact@academy21france.fr
          </div>
          <div style="font-size:11px;color:#bbb;">
            Dream. Action. Success. · Présents sur 5 continents · 75+ pays
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
    });
  }
};