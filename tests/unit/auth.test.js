const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'test_secret', { expiresIn: '7d' });
}
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'test_secret');
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
  return !!password && password.length >= 6;
}
function calculateTotal(payments) {
  return payments.reduce((sum, p) => sum + (p.amount || 0), 0);
}

describe('Tests unitaires — Auth', () => {

  describe('generateToken', () => {
    test('doit générer un token JWT valide', () => {
      const token = generateToken({ id: 'user-123', role: 'user' });
      expect(token).toBeDefined();
      expect(token.split('.')).toHaveLength(3);
    });
    test('le token doit contenir id et role', () => {
      const token = generateToken({ id: 'user-123', role: 'admin' });
      const decoded = verifyToken(token);
      expect(decoded.id).toBe('user-123');
      expect(decoded.role).toBe('admin');
    });
  });

  describe('verifyToken', () => {
    test('doit vérifier un token valide', () => {
      const token = generateToken({ id: 'user-abc', role: 'user' });
      const decoded = verifyToken(token);
      expect(decoded.id).toBe('user-abc');
    });
    test('doit lever une erreur pour un token invalide', () => {
      expect(() => verifyToken('token.invalide.xyz')).toThrow();
    });
  });

  describe('validateEmail', () => {
    test('doit accepter un email valide', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user@academy21france.fr')).toBe(true);
    });
    test('doit rejeter un email invalide', () => {
      expect(validateEmail('pas-un-email')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('doit accepter un mot de passe valide', () => {
      expect(validatePassword('motdepasse')).toBe(true);
      expect(validatePassword('123456')).toBe(true);
    });
    test('doit rejeter un mot de passe trop court', () => {
      expect(validatePassword('abc')).toBe(false);
      expect(validatePassword('')).toBe(false);
      expect(validatePassword(null)).toBe(false);
    });
  });

  describe('bcrypt', () => {
    test('doit hacher un mot de passe', async () => {
      const hashed = await bcrypt.hash('monMotDePasse123', 10);
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe('monMotDePasse123');
    });
    test('doit valider un mot de passe correct', async () => {
      const hashed = await bcrypt.hash('monMotDePasse123', 10);
      expect(await bcrypt.compare('monMotDePasse123', hashed)).toBe(true);
    });
    test('doit rejeter un mot de passe incorrect', async () => {
      const hashed = await bcrypt.hash('monMotDePasse123', 10);
      expect(await bcrypt.compare('mauvais', hashed)).toBe(false);
    });
  });
});

describe('Tests unitaires — Paiements', () => {
  describe('calculateTotal', () => {
    test('doit calculer le total', () => {
      expect(calculateTotal([{ amount: 490 }, { amount: 490 }, { amount: 290 }])).toBe(1270);
    });
    test('doit retourner 0 pour liste vide', () => {
      expect(calculateTotal([])).toBe(0);
    });
    test('doit gérer les montants nulls', () => {
      expect(calculateTotal([{ amount: 490 }, { amount: null }, { amount: 290 }])).toBe(780);
    });
  });
});
