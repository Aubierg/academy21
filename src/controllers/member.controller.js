const prisma = require('../lib/prisma');

exports.getDashboard = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      payments: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      memberSince: user.memberSince
    },
    payments: user.payments,
    totalSpent: user.payments
      .filter(p => p.status === 'succeeded')
      .reduce((acc, p) => acc + p.amount, 0)
  });
};

exports.getPaymentHistory = async (req, res) => {
  const payments = await prisma.payment.findMany({
    where: {
      userId: req.user.id,
      status: 'succeeded'
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json(payments);
};