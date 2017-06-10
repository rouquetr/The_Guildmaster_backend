const express = require('express')
const router = express.Router()
const {
  getAllQuests,
  getAvailableQuests,
  getCurrentQuests
} = require('../services/quest-service')

/* GET home page. */

router.get('/:id', (req, res, next) => getAllQuests(req.params.id).then(result => res.json(result)))

router.get('/:id/available', (req, res, next) => getAvailableQuests(req.params.id).then(result => res.json(result)))

router.get('/:id/current', (req, res, next) => getCurrentQuests(req.params.id).then(result => res.json(result)))

module.exports = router
