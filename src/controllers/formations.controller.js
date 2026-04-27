const prisma = require('../lib/prisma');

exports.getAll = async (req, res) => {
  const formations = await prisma.formation.findMany();
  res.json(formations);
};

exports.getOne = async (req, res) => {
  const formation = await prisma.formation.findUnique({ where: { id: req.params.id } });
  if (!formation) return res.status(404).json({ error: 'Formation introuvable' });
  res.json(formation);
};

exports.create = async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    const formation = await prisma.formation.create({ data: { title, description, price, imageUrl } });
    res.status(201).json(formation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const formation = await prisma.formation.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(formation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  await prisma.formation.delete({ where: { id: req.params.id } });
  res.json({ message: 'Formation supprimée' });
};