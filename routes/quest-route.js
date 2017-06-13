const express = require('express')
const router = express.Router()
const {
  getAllQuests,
  getAvailableQuests,
  getCurrentQuests,
  startQuest,
  validateQuest
} = require('../services/quest-service')

router.get('/:playerId/quest/', (req, res, next) => getAllQuests(req.params.playerId).then(result => res.json(result)))

router.get('/:playerId/quest/available', (req, res, next) => getAvailableQuests(req.params.playerId).then(result => res.json(result)))

router.get('/:playerId/quest/current', (req, res, next) => getCurrentQuests(req.params.playerId).then(result => res.json(result)))

router.post('/:playerId/quest/:questId/start', (req, res, next) => startQuest(req.params.playerId, req.params.questId, req.body.characters)
  .then(result => res.json(result))
  .catch(e => res.status(404).json({ message: 'No quest available for this id' }))
)

router.post('/:playerId/quest/:questId/validate', (req, res, next) => validateQuest(req.params.playerId, req.params.questId)
  .then(result => res.json(result))
  .catch(e => res.status(404).json({ message: 'No quest finished with this id' }))
)

module.exports = router
