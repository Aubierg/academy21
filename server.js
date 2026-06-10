require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.set('trust proxy', 1);

// Sécurité
app.use(helmet());

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://academy21-frontend.vercel.app',
    'https://academy21-frontend-dw7axotka-aubiergs-projects.vercel.app'
  ],
  credentials: true
}));

// Logging des requêtes
app.use((req, res, next) => {
  console.log('📥', req.method, req.path);
  next();
});

// ⚠️ Important : Webhook Stripe doit être AVANT express.json()
app.post('/api/payments/webhook',
  express.raw({ type: '*/*' }),
  function(req,res){ function(req,res){ require('./src/controllers/payments.controller').webhook(req,res); }(req,res); }
);

// Middleware JSON pour les autres routes
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/formations', require('./src/routes/formations'));
app.use('/api/events', require('./src/routes/events'));
app.use('/api/payments', require('./src/routes/payments'));
app.use('/api/member', require('./src/routes/member'));
app.use('/api/admin',  require('./src/routes/admin'));

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'ATO Paris API 🚀' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err.message);
  res.status(err.status || 500).json({ 
    error: err.message || 'Erreur interne du serveur' 
  });
});

// Lancement du serveur
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  });
}
