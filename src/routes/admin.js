const router = require('express').Router();
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const { sendCredentials, getAllPayments } = require('../controllers/admin.controller');
router.use(auth, isAdmin);
router.post('/send-credentials', sendCredentials);
router.get('/payments', getAllPayments);
module.exports = router;
