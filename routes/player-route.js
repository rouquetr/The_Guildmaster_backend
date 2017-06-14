const express = require('express')
const router = express.Router()
const find = require('lodash').find
const {
  logPlayerIn,
  createPlayer,
  getPlayerInfo,
  getPlayerComplete
} = require('../services/player-service')

router.get('/login/:googleId', (req, res, next) => logPlayerIn(req.params.googleId).then(result => result._id ? res.json(result) : res.status(404).json(result)))

router.post('/', (req, res, next) => createPlayer(req.body.name, req.body.googleId, req.body.email).then(result => res.json(result)))

router.get('/:id', (req, res, next) => getPlayerInfo(req.params.id).then(result => res.json(result)))

router.get('/:id/complete', (req, res, next) => getPlayerComplete(req.params.id).then(player => {
  if (req.headers[ 'content-type' ] === 'application/json') res.json(player)
  else {
    const currentQuests = player.quests.currentQuests
    currentQuests.map((currentQuest, index) => {
      const charactersNames = []
      currentQuest.characters.map(characterId => {
        const character = find(player.characters, { id: characterId })
        return character ? charactersNames.push(character.name) : 1
      })
      currentQuests[index].characters = charactersNames
    })
    res.render('player', {
      title: player.player.name,
      player: player.player,
      availableQuests: player.quests.availableQuests,
      currentQuests: currentQuests,
      characters: player.characters
    })
  }
}))

module.exports = router
