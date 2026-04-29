const prisma = require('../lib/prisma');

module.exports = async (req, res, next) => {
  const payment = await prisma.payment.findFirst({
    where: {
      userId: req.user.id,
      status: 'succeeded'
    }
  });

  if (!payment) {
    return res.status(403).json({ error: 'Accès réservé aux membres actifs' });
  }

  next();
};