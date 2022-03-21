const express = require("express");

const accountRouter = require('./accounts/accounts-router')

const server = express();

const {logger} =  require('./accounts/accounts-middleware')

server.use(express.json());

server.use('/api/accounts',logger, accountRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })
  })

server.use('*', (req, res) => {
    // catch all 404 errors middleware
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
  });

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500). json({
      message: err.message,
      stack: err.stack
    })
  })
module.exports = server;
