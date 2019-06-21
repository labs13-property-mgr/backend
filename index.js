require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = require('./api/server.js');

server.use(cors());
server.use(helmet());
server.use(express.json());

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
