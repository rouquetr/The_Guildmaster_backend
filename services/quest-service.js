const { documents } = require('../db')

function getAllQuests (playerId) {
  return documents.Player.findById(playerId)
    .then(player => player.quests)
}

function getAvailableQuests (playerId) {
  return documents.Player.findById(playerId)
    .then(player => player.quests.availableQuests)
}

function getCurrentQuests (playerId) {
  return documents.Player.findById(playerId)
    .then(player => player.quests.currentQuests)
}

module.exports = {
  getAllQuests,
  getAvailableQuests,
  getCurrentQuests
}