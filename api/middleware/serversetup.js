const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('../routes/user-router');
const propertyRouter = require('../routes/property-router');

module.exports = (server) => {
	server.use(helmet());
	server.use(express.json());
	server.use(cors());
	server.use('/api/users', userRouter);
	server.use('/api/properties', propertyRouter);
};
