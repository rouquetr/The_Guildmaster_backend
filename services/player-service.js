const { documents } = require('../db')

function createPlayer (name, googleId) {
  const newPlayer = { player: { name, googleId, reputation: 0, money: 0 } }
  return new documents.Player(newPlayer).save()
}

function getPlayerComplete (playerId) {
  return documents.Player.findById(playerId)
}

function getPlayerInfo (playerId) {
  return documents.Player.findById(playerId)
    .then(player => player.player)
}

module.exports = {
  createPlayer,
  getPlayerComplete,
  getPlayerInfo
}