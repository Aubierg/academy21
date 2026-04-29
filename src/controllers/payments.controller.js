const stripe = require('../lib/stripe');
const prisma = require('../lib/prisma');
const { ordersController } = require('../lib/paypal');
const { sendConfirmationEmail } = require('../lib/emails');

// ─── STRIPE ───────────────────────────────────────────

exports.createCheckout = async (req, res) => {
  try {
    const { formationId, amount, title } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: title },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/paiement/echec`,
      metadata: { userId: req.user.id, formationId: formationId || '' }
    });

    await prisma.payment.create({
      data: {
        userId: req.user.id,
        formationId: formationId || null,
        amount,
        method: 'stripe',
        status: 'pending',
        stripeSessionId: session.id
      }
    });

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    await sendConfirmationEmail({
      to: user.email,
      name: user.email,
      amount,
      method: 'stripe',
      title
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await prisma.payment.updateMany({
      where: { stripeSessionId: session.id },
      data: { status: 'succeeded' }
    });
  }

  res.json({ received: true });
};

exports.getMyPayments = async (req, res) => {
  const payments = await prisma.payment.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });
  res.json(payments);
};

// ─── PAYPAL ───────────────────────────────────────────

exports.createPaypalOrder = async (req, res) => {
  try {
    const { amount, formationId, title } = req.body;

    const order = await ordersController.createOrder({
      body: {
        intent: 'CAPTURE',
        purchaseUnits: [{
          amount: {
            currencyCode: 'EUR',
            value: amount.toString()
          },
          description: title
        }],
        applicationContext: {
          returnUrl: `${process.env.FRONTEND_URL}/paiement/succes`,
          cancelUrl: `${process.env.FRONTEND_URL}/paiement/echec`
        }
      }
    });

    await prisma.payment.create({
      data: {
        userId: req.user.id,
        formationId: formationId || null,
        amount,
        method: 'paypal',
        status: 'pending',
        paypalOrderId: order.result.id
      }
    });

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    await sendConfirmationEmail({
      to: user.email,
      name: user.email,
      amount,
      method: 'paypal',
      title
    });

    const approvalUrl = order.result.links.find(l => l.rel === 'approve').href;
    res.json({ url: approvalUrl, orderId: order.result.id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.capturePaypalOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const capture = await ordersController.captureOrder({
      id: orderId,
      body: {}
    });

    await prisma.payment.updateMany({
      where: { paypalOrderId: orderId },
      data: { status: 'succeeded' }
    });

    res.json({ status: capture.result.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};