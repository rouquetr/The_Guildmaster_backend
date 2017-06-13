const app = require('./app')
const config = require('config')
const mongo = require('./db')

const port = normalizePort(process.env.PORT || config.port)

mongo.connect().then(() =>
  app.listen(port, function () {
    console.log(`The Guildmaster server listening on port ${port}!`)
  })
)

function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}
