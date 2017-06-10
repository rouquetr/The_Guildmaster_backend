const { documents } = require('../db')

function createPlayer (name, googleId) {
  const newPlayer = { player: { name, googleId, reputation: 0, money: 0 } }
  return new documents.Player(newPlayer).save()
}

function getPlayerComplete (id) {
  return documents.Player.findById(id)
}

function getPlayerInfo (id) {
  return documents.Player.findById(id)
    .then(player => player.player)
}

module.exports = {
  createPlayer,
  getPlayerComplete,
  getPlayerInfo
}