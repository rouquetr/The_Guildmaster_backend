const express = require('express')
const router = express.Router()
const {
  logPlayerIn,
  createPlayer,
  getPlayerInfo,
  getPlayerComplete
} = require('../services/player-service')

router.get('/login/:googleId', (req, res, next) => logPlayerIn(req.params.googleId).then(result => result._id ? res.json(result) : res.status(404).json(result)))

router.post('/', (req, res, next) => createPlayer(req.body.name, req.body.googleId, req.body.email).then(result => res.json(result)))

router.get('/:id', (req, res, next) => getPlayerInfo(req.params.id).then(result => res.json(result)))

router.get('/:id/complete', (req, res, next) => getPlayerComplete(req.params.id).then(result => res.json(result)))

module.exports = router
