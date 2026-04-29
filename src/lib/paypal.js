const { Client, Environment, OrdersController } = require('@paypal/paypal-server-sdk');

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_SECRET,
  },
  environment: Environment.Sandbox,
});

const ordersController = new OrdersController(client);
module.exports = { ordersController };