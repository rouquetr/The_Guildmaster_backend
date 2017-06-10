const indexRoute  =      require('./index-route')
const playerRoute =      require('./player-route')

// Call all the application sub routers
module.exports = function createRoutes (app) {
  // Define all the application routes
  app.use('/',            indexRoute)
  app.use('/player',      playerRoute)
}
