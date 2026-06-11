const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const { getDashboard } = require('../controllers/member.controller');

router.get('/dashboard', authMiddleware, getDashboard);

module.exports = router;
