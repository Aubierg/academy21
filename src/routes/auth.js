const { authLimiter } = require('../middlewares/rateLimiter');
const router = require('express').Router();

const { register, login, me } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth');

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', authMiddleware, me);

module.exports = router;