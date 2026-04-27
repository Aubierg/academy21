const router = require('express').Router();
const auth = require('../middlewares/auth');
const e = require('../controllers/events.controller');

router.get('/', e.getAll);
router.get('/:id', e.getOne);
router.post('/', auth, e.create);
router.put('/:id', auth, e.update);
router.delete('/:id', auth, e.remove);

module.exports = router;