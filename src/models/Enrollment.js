const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Enrollment = {
  create: async (data) => {
    return prisma.enrollment.create({
      data: {
        userId: data.userId,
        formationId: data.formationId,
        status: 'active',
        paidAmount: data.paidAmount,
        paymentMethod: data.paymentMethod,
      },
      include: {
        user: true,
        formation: true
      }
    });
  },

  findByUserAndFormation: async (userId, formationId) => {
    return prisma.enrollment.findFirst({
      where: { userId, formationId }
    });
  }
};

module.exports = Enrollment;