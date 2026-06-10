const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');
const { sendCredentialsEmail } = require('../lib/emails');

function generatePassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#';
  let pwd = '';
  for (let i = 0; i < 10; i++) pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  return pwd;
}

exports.sendCredentials = async (req, res) => {
  try {
    const { prenom, nom, email, password, formationTitle } = req.body;
    if (!email || !prenom || !nom) return res.status(400).json({ error: 'prenom, nom et email sont requis' });
    const rawPassword = password || generatePassword();
    const hashed = await bcrypt.hash(rawPassword, 12);
    let user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (user) {
      user = await prisma.user.update({ where: { email: email.toLowerCase().trim() }, data: { password: hashed, memberSince: user.memberSince || new Date() } });
    } else {
      user = await prisma.user.create({ data: { email: email.toLowerCase().trim(), password: hashed, role: 'user', memberSince: new Date() } });
    }
    await sendCredentialsEmail({ to: email, prenom, nom, email, password: rawPassword, formationTitle: formationTitle || null });
    console.log('📧 Credentials envoyés à :', email);
    res.json({ success: true, message: `Compte créé et identifiants envoyés à ${email}`, userId: user.id, generatedPassword: !password ? rawPassword : undefined });
  } catch (err) {
    console.error('❌ send-credentials error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({ orderBy: { createdAt: 'desc' }, include: { user: { select: { id: true, email: true, role: true, memberSince: true } }, formation: { select: { title: true } } } });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
