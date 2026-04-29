const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());


// ⚠️ Webhook avant express.json()
app.use('/api/member', require('./src/routes/member'));
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/formations', require('./src/routes/formations'));
app.use('/api/events', require('./src/routes/events'));
app.use('/api/payments', require('./src/routes/payments'));

app.get('/', (req, res) => res.json({ message: 'ATO Paris API 🚀' }));

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
});