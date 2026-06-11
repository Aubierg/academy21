const router = require('express').Router();
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const ctrl = require('../controllers/admin.controller');

router.use(auth, isAdmin);

// Stats
router.get('/stats', ctrl.getStats);

// Membres
router.get('/members', ctrl.getAllMembers);
router.delete('/members/:id', ctrl.deleteMember);

// Paiements
router.get('/payments', ctrl.getAllPayments);

// Candidatures
router.get('/candidatures', ctrl.getAllCandidatures);
router.patch('/candidatures/:id/status', ctrl.updateCandidatureStatus);
router.delete('/candidatures/:id', ctrl.deleteCandidature);

// Formations
router.get('/formations', ctrl.getAllFormations);
router.post('/formations', ctrl.createFormation);
router.put('/formations/:id', ctrl.updateFormation);
router.delete('/formations/:id', ctrl.deleteFormation);

// Événements
router.get('/events', ctrl.getAllEvents);
router.post('/events', ctrl.createEvent);
router.put('/events/:id', ctrl.updateEvent);
router.delete('/events/:id', ctrl.deleteEvent);

// Ancien
router.post('/send-credentials', ctrl.sendCredentials);

module.exports = router;