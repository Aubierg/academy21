const prisma = require('../lib/prisma');

exports.getFormations = async (req, res) => {
  try {
    const formations = await prisma.formation.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(formations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFormation = async (req, res) => {
  try {
    const formation = await prisma.formation.findUnique({ where: { id: req.params.id } });
    if (!formation) return res.status(404).json({ error: 'Formation introuvable' });
    res.json(formation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
