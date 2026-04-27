const prisma = require('../lib/prisma');

exports.getAll = async (req, res) => {
  const events = await prisma.event.findMany();
  res.json(events);
};

exports.getOne = async (req, res) => {
  const event = await prisma.event.findUnique({ where: { id: req.params.id } });
  if (!event) return res.status(404).json({ error: 'Événement introuvable' });
  res.json(event);
};

exports.create = async (req, res) => {
  try {
    const { title, description, date, price, imageUrl } = req.body;
    const event = await prisma.event.create({
      data: { title, description, date: new Date(date), price, imageUrl }
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  await prisma.event.delete({ where: { id: req.params.id } });
  res.json({ message: 'Événement supprimé' });
};