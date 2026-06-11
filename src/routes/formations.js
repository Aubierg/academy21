const router = require('express').Router();
const { getFormations, getFormation } = require('../controllers/formations.controller');

router.get('/', getFormations);
router.get('/:id', getFormation);

module.exports = router;
