const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
const prisma = require('../lib/prisma');
const { sendConfirmationEmail } = require('../lib/emails');

const PAYPAL_BASE = process.env.PAYPAL_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPaypalToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials'
  });
  const data = await res.json();
  return data.access_token;
}

// ─── Stripe Checkout ──────────────────────────────────────────────────────
exports.createCheckout = async (req, res) => {
  try {
    const { price = 490, title = 'Formation IA Marketing de Réseau', formationId, clientInfo } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'eur', product_data: { name: title }, unit_amount: Math.round(price * 100) }, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/paiement/echec`,
      metadata: {
        formationId: formationId || 'ia-marketing-reseau',
        title,
        amount: String(price),
        clientEmail: clientInfo?.email || '',
        clientPrenom: clientInfo?.prenom || '',
        clientNom: clientInfo?.nom || '',
        clientTel: clientInfo?.telephone || '',
      }
    });

    // ✅ Enregistrer le paiement en base
    await prisma.payment.create({
      data: {
        userId: req.user.id,
        amount: price,
        currency: 'eur',
        status: 'completed',
        method: 'stripe',
        stripeSessionId: session.id,
      }
    });

    // ✅ Envoyer les emails
    const clientEmail = clientInfo?.email || req.user?.email;
    const clientName = clientInfo?.prenom
      ? `${clientInfo.prenom} ${clientInfo.nom || ''}`.trim()
      : clientEmail;

    if (clientEmail) {
      try {
        await sendConfirmationEmail({ to: clientEmail, name: clientName, amount: price, method: 'stripe', title });
        console.log('📧 Email client envoyé à', clientEmail);
        await sendConfirmationEmail({
          to: process.env.ADMIN_EMAIL, name: clientName, amount: price,
          method: 'stripe', title, isAdminNotif: true,
          clientInfo: { prenom: clientInfo?.prenom || '', nom: clientInfo?.nom || '', email: clientEmail, telephone: clientInfo?.telephone || '' }
        });
        console.log('📧 Email admin envoyé');
      } catch (emailErr) {
        console.error('Email error:', emailErr.message);
      }
    }

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// ─── Stripe Webhook ───────────────────────────────────────────────────────
exports.webhook = async (req, res) => {
  res.json({ received: true });
};

// ─── PayPal ───────────────────────────────────────────────────────────────
exports.createPaypalOrder = async (req, res) => {
  try {
    const { amount = 490, title = 'Formation IA', clientInfo } = req.body;
    const access_token = await getPaypalToken();
    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: 'EUR', value: String(amount) },
          description: title,
          custom_id: JSON.stringify({
            userId: req.user.id,
            prenom: clientInfo?.prenom || '',
            nom: clientInfo?.nom || '',
            email: clientInfo?.email || req.user?.email || '',
            telephone: clientInfo?.telephone || '',
            title, amount
          })
        }],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/paiement/succes`,
          cancel_url: `${process.env.FRONTEND_URL}/paiement/echec`
        }
      })
    });
    const order = await orderRes.json();
    if (!order.id) return res.status(500).json({ error: 'Erreur création commande PayPal' });
    const approveUrl = order.links?.find(l => l.rel === 'approve')?.href;
    res.json({ url: approveUrl, orderId: order.id });
  } catch (err) {
    console.error('PayPal create error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.capturePaypalOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ error: 'orderId requis' });

    const access_token = await getPaypalToken();
    const captureRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' }
    });
    const capture = await captureRes.json();

    const customId = capture.purchase_units?.[0]?.custom_id;
    let clientInfo = {}, title = 'Formation', amount = 490, userId = null;
    if (customId) {
      try {
        const parsed = JSON.parse(customId);
        clientInfo = { prenom: parsed.prenom, nom: parsed.nom, email: parsed.email, telephone: parsed.telephone };
        title = parsed.title || title;
        amount = parsed.amount || amount;
        userId = parsed.userId;
      } catch { console.warn('Could not parse PayPal custom_id'); }
    }

    // ✅ Enregistrer le paiement en base
    if (userId) {
      await prisma.payment.create({
        data: {
          userId,
          amount,
          currency: 'eur',
          status: 'completed',
          method: 'paypal',
          paypalOrderId: orderId,
        }
      });
    }

    const clientEmail = clientInfo.email;
    const clientName = `${clientInfo.prenom || ''} ${clientInfo.nom || ''}`.trim() || clientEmail;

    try {
      if (clientEmail) {
        await sendConfirmationEmail({ to: clientEmail, name: clientName, amount, method: 'paypal', title });
        console.log('📧 Email client PayPal envoyé à', clientEmail);
      }
      await sendConfirmationEmail({ to: process.env.ADMIN_EMAIL, name: clientName, amount, method: 'paypal', title, isAdminNotif: true, clientInfo });
      console.log('📧 Email admin PayPal envoyé');
    } catch (emailErr) {
      console.error('Email error:', emailErr.message);
    }

    res.json({ success: true, capture });
  } catch (err) {
    console.error('PayPal capture error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPayments = (req, res) => res.json([]);

module.exports = exports;
