const express = require('express')
const router = express.Router()
const {
  getAllQuests,
  getAvailableQuests,
  getCurrentQuests
} = require('../services/quest-service')

/* GET home page. */

router.get('/:playerId/quest/', (req, res, next) => getAllQuests(req.params.playerId).then(result => res.json(result)))

router.get('/:playerId/quest/available', (req, res, next) => getAvailableQuests(req.params.playerId).then(result => res.json(result)))

router.get('/:playerId/quest/current', (req, res, next) => getCurrentQuests(req.params.playerId).then(result => res.json(result)))

module.exports = router
