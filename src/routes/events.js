const router = require('express').Router();
const { getEvents, getEvent } = require('../controllers/events.controller');

router.get('/', getEvents);
router.get('/:id', getEvent);

module.exports = router;
