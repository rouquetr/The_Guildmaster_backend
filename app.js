const express = require('express')
const winston = require('winston')
const expressWinston = require('express-winston')

const createRoutes = require('./routes')

const app = express()

app.set('view engine', 'jade')

app.use(expressWinston.logger({
  transports: [ new winston.transports.Console({ json: false, colorize: true }) ],
  meta: false
}))

createRoutes(app)

module.exports = app