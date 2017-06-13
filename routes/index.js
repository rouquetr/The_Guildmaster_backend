const bodyParser     =      require('body-parser')

const indexRoute     =      require('./index-route')
const playerRoute    =      require('./player-route')
const questRoute     =      require('./quest-route')
const characterRoute =      require('./character-route')

module.exports = function createRoutes (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use('/',            indexRoute)
  app.use('/player',      playerRoute)
  app.use('/player',      questRoute)
  app.use('/player',      characterRoute)
}
