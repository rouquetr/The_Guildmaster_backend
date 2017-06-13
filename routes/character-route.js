const express = require('express')
const router = express.Router()
const {
  getAllCharacters,
  recruitCharacter,
  upgradeCharacter
} = require('../services/character-service')

router.post('/:playerId/character', (req, res, next) => recruitCharacter(req.params.playerId, req.body.class).then(result => res.json(result)))

router.get('/:playerId/character', (req, res, next) => getAllCharacters(req.params.playerId).then(result => res.json(result)))

router.put('/:playerId/character/:characterId',
  (req, res, next) => upgradeCharacter(req.params.playerId, req.params.characterId, req.body.cost, req.body.weaponLevel, req.body.armorLevel)
    .then(result => res.json(result))
    .catch(e => res.status(404).json({ message: e.message }))
)

module.exports = router
