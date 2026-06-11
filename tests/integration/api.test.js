const request = require('supertest');
const app = require('../../server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let authToken = '';
let adminToken = '';

beforeAll(async () => {
  await prisma.user.deleteMany({ where: { email: { in: ['test.int@academy21.fr', 'admin.int@academy21.fr'] } } });

  const res = await request(app).post('/api/auth/register')
    .send({ email: 'test.int@academy21.fr', password: 'TestPassword123' });
  authToken = res.body.token;

  await request(app).post('/api/auth/register')
    .send({ email: 'admin.int@academy21.fr', password: 'AdminPassword123' });
  await prisma.user.update({ where: { email: 'admin.int@academy21.fr' }, data: { role: 'admin' } });
  const adminRes = await request(app).post('/api/auth/login')
    .send({ email: 'admin.int@academy21.fr', password: 'AdminPassword123' });
  adminToken = adminRes.body.token;
});

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: { in: ['test.int@academy21.fr', 'admin.int@academy21.fr', 'nouveau@test.fr'] } } });
  await prisma.$disconnect();
});

describe('POST /api/auth/register', () => {
  test('doit créer un compte valide', async () => {
    const res = await request(app).post('/api/auth/register')
      .send({ email: 'nouveau@test.fr', password: 'Password123' });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });
  test('doit refuser un email déjà utilisé', async () => {
    const res = await request(app).post('/api/auth/register')
      .send({ email: 'test.int@academy21.fr', password: 'Password123' });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});

describe('POST /api/auth/login', () => {
  test('doit connecter avec bons identifiants', async () => {
    const res = await request(app).post('/api/auth/login')
      .send({ email: 'test.int@academy21.fr', password: 'TestPassword123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
  test('doit refuser des identifiants incorrects', async () => {
    const res = await request(app).post('/api/auth/login')
      .send({ email: 'test.int@academy21.fr', password: 'MauvaisMotDePasse' });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});

describe('GET /api/auth/me', () => {
  test('doit retourner le profil avec token valide', async () => {
    const res = await request(app).get('/api/auth/me')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('test.int@academy21.fr');
  });
  test('doit refuser sans token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });
});

describe('GET /api/member/dashboard', () => {
  test('doit retourner le dashboard membre', async () => {
    const res = await request(app).get('/api/member/dashboard')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.payments).toBeDefined();
  });
  test('doit refuser sans token', async () => {
    const res = await request(app).get('/api/member/dashboard');
    expect(res.status).toBe(401);
  });
});

describe('GET /api/admin/stats', () => {
  test('doit retourner les stats pour admin', async () => {
    const res = await request(app).get('/api/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.totalMembers).toBeDefined();
  });
  test('doit refuser pour un utilisateur normal', async () => {
    const res = await request(app).get('/api/admin/stats')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(403);
  });
});

describe('GET /api/admin/candidatures', () => {
  test('doit retourner les candidatures', async () => {
    const res = await request(app).get('/api/admin/candidatures')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
