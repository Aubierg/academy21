const router = require('express').Router();
const auth = require('../middlewares/auth');
const isMember = require('../middlewares/isMember');
const m = require('../controllers/member.controller');

router.get('/dashboard', auth, isMember, m.getDashboard);
router.get('/payments', auth, isMember, m.getPaymentHistory);

module.exports = router;