const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
const prisma = require('../lib/prisma');
const { sendConfirmationEmail } = require('../lib/emails');

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
        clientPrenom: clientInfo?.prenom || '',
        clientNom: clientInfo?.nom || '',
        clientEmail: clientInfo?.email || '',
        clientTel: clientInfo?.telephone || '',
      }
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// ─── Stripe Webhook ───────────────────────────────────────────────────────
exports.webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy');
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).json({ error: err.message });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const meta = session.metadata || {};
    const clientEmail = meta.clientEmail;
    const clientName = `${meta.clientPrenom} ${meta.clientNom}`.trim() || clientEmail;
    const amount = parseFloat(meta.amount) || 490;
    const title = meta.title || 'Formation';

    try {
      // Email client
      if (clientEmail) {
        await sendConfirmationEmail({ to: clientEmail, name: clientName, amount, method: 'stripe', title });
        console.log('📧 Email client envoyé à', clientEmail);
      }
      // Email admin
      await sendConfirmationEmail({
        to: process.env.ADMIN_EMAIL,
        name: clientName,
        amount,
        method: 'stripe',
        title,
        isAdminNotif: true,
        clientInfo: { prenom: meta.clientPrenom, nom: meta.clientNom, email: clientEmail, telephone: meta.clientTel }
      });
      console.log('📧 Email admin envoyé');
    } catch (emailErr) {
      console.error('Email error:', emailErr.message);
    }
  }
  res.json({ received: true });
};

// ─── PayPal ───────────────────────────────────────────────────────────────
const paypalClientInfoCache = {};

exports.createPaypalOrder = async (req, res) => {
  try {
    const { amount = 490, title = 'Formation IA', clientInfo } = req.body;
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials'
    });
    const { access_token } = await tokenRes.json();
    const orderRes = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{ amount: { currency_code: 'EUR', value: String(amount) }, description: title }],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/paiement/succes`,
          cancel_url: `${process.env.FRONTEND_URL}/paiement/echec`
        }
      })
    });
    const order = await orderRes.json();
    if (clientInfo && order.id) paypalClientInfoCache[order.id] = { clientInfo, title, amount };
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
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials'
    });
    const { access_token } = await tokenRes.json();
    const captureRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' }
    });
    const capture = await captureRes.json();
    const cached = paypalClientInfoCache[orderId] || {};
    const clientInfo = cached.clientInfo || {};
    const title = cached.title || 'Formation';
    const amount = cached.amount || 490;
    const clientEmail = clientInfo.email;
    const clientName = `${clientInfo.prenom || ''} ${clientInfo.nom || ''}`.trim() || clientEmail;
    try {
      if (clientEmail) {
        await sendConfirmationEmail({ to: clientEmail, name: clientName, amount, method: 'paypal', title });
        console.log('📧 Email client PayPal envoyé à', clientEmail);
      }
      await sendConfirmationEmail({
        to: process.env.ADMIN_EMAIL,
        name: clientName,
        amount,
        method: 'paypal',
        title,
        isAdminNotif: true,
        clientInfo
      });
      console.log('📧 Email admin PayPal envoyé');
    } catch (emailErr) {
      console.error('Email error:', emailErr.message);
    }
    delete paypalClientInfoCache[orderId];
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
