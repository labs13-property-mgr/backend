const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('../routes/user-router');
const propertyRouter = require('../routes/property-router');
const tenantRouter = require('../routes/tenant-router');
const serviceRouter = require('../routes/service-router');
const vendorRouter = require('../routes/vendor-router');
const receiptRouter = require('./../routes/receipts-router');
const propImgRouter = require('./../routes/propImage-router');

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use('/api/user', userRouter);
  server.use('/api/property', propertyRouter);
  server.use('/api/tenant', tenantRouter);
  server.use('/api/service', serviceRouter);
  server.use('/api/vendor', vendorRouter);
  server.use('/api/receipt', receiptRouter);
  server.use('/api/propimg', propImgRouter);
};
