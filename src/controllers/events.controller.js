const prisma = require('../lib/prisma');

exports.getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!event) return res.status(404).json({ error: 'Événement introuvable' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
