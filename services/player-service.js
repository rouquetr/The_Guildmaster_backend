const { documents } = require('../db')
const { sendEmail } = require('./mail-service')

function logPlayerIn (googleId) {
  return documents.Player.findOne({ 'player.googleId': googleId })
    .then(player => {
      return player ? { _id: player._id } : { _id: null }
    })
}

function createPlayer (name, googleId, email) {
  const newPlayer = { player: { name, googleId, email, reputation: 0, money: 0 } }
  return new documents.Player(newPlayer).save()
    .then(player => sendEmail(player.player.email, player._id, player.player.name).then(() => player))
}

function getPlayerComplete (playerId) {
  return documents.Player.findById(playerId)
}

function getPlayerInfo (playerId) {
  return documents.Player.findById(playerId)
    .then(player => player.player)
}

function getLeaderboard(){
  return documents.Player.find({}, null, { sort: { 'player.reputation': 'desc' } })
    .then(players => players.map((element, index) => {
      const player = {
        _id: element._id,
        name: element.player.name,
        reputation: element.player.reputation,
        rank: index +1
      }
      return player
    }))
}

module.exports = {
  logPlayerIn,
  createPlayer,
  getPlayerComplete,
  getPlayerInfo,
  getLeaderboard
}