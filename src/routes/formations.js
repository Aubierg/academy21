const router = require('express').Router();
const auth = require('../middlewares/auth');
const f = require('../controllers/formations.controller');

router.get('/', f.getAll);
router.get('/:id', f.getOne);
router.post('/', auth, f.create);
router.put('/:id', auth, f.update);
router.delete('/:id', auth, f.remove);

module.exports = router;