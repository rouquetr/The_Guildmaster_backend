const app = require('./app')
const config = require('config')
const mongo = require('./db')

mongo.connect().then(() =>
  app.listen(config.port, function () {
    console.log(`The Guildmaster server listening on port ${config.port}!`)
  })
)
