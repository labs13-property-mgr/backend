const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('../routes/user-router');
const propertyRouter = require('../routes/property-router');
const tenantRouter = require('../routes/tenant-router');
const serviceRouter = require('../routes/service-router');
const vendorRouter = require('../routes/vendor-router');

module.exports = (server) => {
	server.use(helmet());
	server.use(express.json());
	server.use(cors());
	server.use('/api/users', userRouter);
	server.use('/api/properties', propertyRouter);
	server.use('/api/tenant', tenantRouter);
	server.use('/api/service', serviceRouter);
	server.use('/api/vendor', vendorRouter);
};
