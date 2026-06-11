const prisma = require('../lib/prisma');

exports.getDashboard = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { payments: { orderBy: { createdAt: 'desc' } } }
    });
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

    const totalSpent = user.payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        memberSince: user.memberSince,
      },
      payments: user.payments,
      totalSpent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
