const { documents } = require('../db')

function getPlayerComplete(id) {
  return documents.Player.findById(id)
}

function getPlayerInfo(id) {
  return documents.Player.findById(id)
    .then(player => player.player)
}

module.exports = {
  getPlayerComplete,
  getPlayerInfo
}