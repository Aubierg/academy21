const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');
const { sendConfirmationEmail } = require('../lib/emails');

function generatePassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#';
  let pwd = '';
  for (let i = 0; i < 10; i++) pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  return pwd;
}

// ─── STATS ───────────────────────────────────────────────
exports.getStats = async (req, res) => {
  try {
    const [totalMembers, totalPayments, totalCandidatures, formations] = await Promise.all([
      prisma.user.count(),
      prisma.payment.findMany({ select: { amount: true } }),
      prisma.candidature.count(),
      prisma.formation.count(),
    ]);
    const totalRevenue = totalPayments.reduce((s, p) => s + (p.amount || 0), 0);
    res.json({ totalMembers, totalPayments: totalPayments.length, totalRevenue, totalCandidatures, formations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── MEMBRES ─────────────────────────────────────────────
exports.getAllMembers = async (req, res) => {
  try {
    const members = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, role: true, memberSince: true, createdAt: true,
        payments: { select: { id: true, amount: true, status: true, createdAt: true } }
      }
    });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── PAIEMENTS ───────────────────────────────────────────
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, email: true } },
        formation: { select: { title: true } }
      }
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── CANDIDATURES ────────────────────────────────────────
exports.getAllCandidatures = async (req, res) => {
  try {
    const candidatures = await prisma.candidature.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { email: true } } }
    });
    res.json(candidatures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCandidatureStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['en_attente', 'acceptee', 'refusee'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }
    const candidature = await prisma.candidature.update({
      where: { id },
      data: { status }
    });
    // Email au candidat
    try {
      const subject = status === 'acceptee'
        ? '✅ Votre candidature a été acceptée — Academy 21 France'
        : '❌ Votre candidature — Academy 21 France';
      const html = status === 'acceptee'
        ? `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
            <div style="background:#C8102E;padding:20px;text-align:center;">
              <h1 style="color:white;margin:0;">Academy 21 France</h1>
            </div>
            <div style="padding:24px;">
              <h3>Bonjour ${candidature.prenom} 👋</h3>
              <p>Félicitations ! Votre candidature a été <strong>acceptée</strong>.</p>
              <p>Notre équipe vous contactera très prochainement pour la suite.</p>
              <p>Bienvenue dans la famille Academy 21 France !</p>
            </div>
          </div>`
        : `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
            <div style="background:#C8102E;padding:20px;text-align:center;">
              <h1 style="color:white;margin:0;">Academy 21 France</h1>
            </div>
            <div style="padding:24px;">
              <h3>Bonjour ${candidature.prenom},</h3>
              <p>Nous avons bien étudié votre candidature.</p>
              <p>Malheureusement, nous ne pouvons pas y donner suite pour le moment.</p>
              <p>Nous vous souhaitons bonne continuation.</p>
            </div>
          </div>`;
      const nodemailer = require('../lib/mailer');
      await nodemailer.sendMail({
        from: `"Academy 21 France" <${process.env.MAIL_FROM}>`,
        to: candidature.email,
        subject,
        html
      });
    } catch (emailErr) {
      console.error('Email candidature error:', emailErr.message);
    }
    res.json(candidature);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCandidature = async (req, res) => {
  try {
    await prisma.candidature.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── FORMATIONS ──────────────────────────────────────────
exports.getAllFormations = async (req, res) => {
  try {
    const formations = await prisma.formation.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { payments: true } } }
    });
    res.json(formations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFormation = async (req, res) => {
  try {
    const { title, description, price, duration, imageUrl } = req.body;
    if (!title || !description || !price) return res.status(400).json({ error: 'Champs requis manquants' });
    const formation = await prisma.formation.create({
      data: { title, description, price: parseFloat(price), duration: duration || '20h', imageUrl }
    });
    res.status(201).json(formation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFormation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, duration, imageUrl, isActive } = req.body;
    const formation = await prisma.formation.update({
      where: { id },
      data: { title, description, price: price ? parseFloat(price) : undefined, duration, imageUrl, isActive }
    });
    res.json(formation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFormation = async (req, res) => {
  try {
    await prisma.formation.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── ÉVÉNEMENTS ──────────────────────────────────────────
exports.getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, price, location, isOnline, imageUrl } = req.body;
    if (!title || !date) return res.status(400).json({ error: 'Titre et date requis' });
    const event = await prisma.event.create({
      data: { title, description, date: new Date(date), price: parseFloat(price) || 0, location, isOnline: !!isOnline, imageUrl }
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, price, location, isOnline, imageUrl } = req.body;
    const event = await prisma.event.update({
      where: { id },
      data: { title, description, date: date ? new Date(date) : undefined, price: price ? parseFloat(price) : undefined, location, isOnline, imageUrl }
    });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── SEND CREDENTIALS (ancien) ───────────────────────────
exports.sendCredentials = async (req, res) => {
  try {
    const { prenom, nom, email, password, formationTitle } = req.body;
    if (!email || !prenom || !nom) return res.status(400).json({ error: 'prenom, nom et email sont requis' });
    const rawPassword = password || generatePassword();
    const hashed = await bcrypt.hash(rawPassword, 12);
    let user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (user) {
      user = await prisma.user.update({ where: { email: email.toLowerCase().trim() }, data: { password: hashed } });
    } else {
      user = await prisma.user.create({ data: { email: email.toLowerCase().trim(), password: hashed, role: 'user', memberSince: new Date() } });
    }
    res.json({ success: true, message: `Compte créé pour ${email}`, userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};