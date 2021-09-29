const express = require('express');
const { logger } = require('./middleware/middleware');
const usersRouter = require('./users/users-router');

const server = express();

server.use(express.json());

server.use('/api/users', logger, usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found!`})
});

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message:err.message
  });
}

server.use(errorHandling);

module.exports = server;