const express = require('express');
const configureMiddleware = require('./middleware/serverSetup');

const tenantRouter = require('../tenant/tenant-router.js');
const propertyRouter = require('../property/property-router');

const server = express();
configureMiddleware(server);

server.use('/api/tenant', tenantRouter);
server.use('/api/property', propertyRouter);

server.get('/', async (req, res) => {
	res.status(200).json({ message: 'Server running....' });
});

module.exports = server;
