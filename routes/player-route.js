const express = require('express')
const router = express.Router()
const {
  getPlayerInfo,
  getPlayerComplete
} = require('../services/player-service')

/* GET home page. */
router.get('/:id', (req, res, next) => getPlayerInfo(req.params.id).then(result => res.json(result)))

router.get('/:id/complete', (req, res, next) => getPlayerComplete(req.params.id).then(result => res.json(result)))

module.exports = router
