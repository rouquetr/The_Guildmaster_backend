const express = require('express')
const router = express.Router()
const {
  getAllCharacters,
  recruitCharacter
} = require('../services/character-service')

router.post('/:playerId/character', (req, res, next) => recruitCharacter(req.params.playerId, req.body.class).then(result => res.json(result)))

router.get('/:playerId/character', (req, res, next) => getAllCharacters(req.params.playerId).then(result => res.json(result)))

module.exports = router
