const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const { getDashboard } = require('../controllers/member.controller');

// Dashboard
router.get('/dashboard', authMiddleware, getDashboard);

// Droit d'accès — GET /api/member/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, role: true, memberSince: true, createdAt: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Droit de rectification — PUT /api/member/profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = {};
    if (email) data.email = email.toLowerCase().trim();
    if (password) data.password = await bcrypt.hash(password, 12);
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
      select: { id: true, email: true, role: true, createdAt: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Droit à l'effacement — DELETE /api/member/account
router.delete('/account', authMiddleware, async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.json({ success: true, message: 'Compte supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Droit à la portabilité — GET /api/member/export
router.get('/export', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, role: true, memberSince: true, createdAt: true }
    });
    const payments = await prisma.payment.findMany({
      where: { userId: req.user.id },
      select: { id: true, amount: true, currency: true, status: true, method: true, createdAt: true }
    });
    const candidatures = await prisma.candidature.findMany({
      where: { userId: req.user.id },
      select: { id: true, prenom: true, nom: true, email: true, status: true, createdAt: true }
    });
    res.json({ user, payments, candidatures, exportedAt: new Date() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;