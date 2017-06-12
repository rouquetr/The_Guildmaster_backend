const uuidV4 = require('uuid/v4')
const faker = require('faker')
const moment = require('moment')
const questConfig = require('config').quest

const { documents } = require('../db')

function getAllQuests (playerId) {
  return documents.Player.findById(playerId)
    .then(player => generateQuestsIfExpired(player))
}

function getAvailableQuests (playerId) {
  return documents.Player.findById(playerId)
    .then(player => generateQuestsIfExpired(player))
    .then(player => player.quests.availableQuests)
}

function getCurrentQuests (playerId) {
  return documents.Player.findById(playerId)
    .then(player => player.quests.currentQuests)
}

function generateQuests () {
  const quests = []
  for (let i = 0; i < 5; i++) {
    quests.push({
      id: uuidV4(),
      questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
      level: faker.random.number(5),
      length: faker.random.number(600),
      lethality: faker.random.number(5),
      reward: faker.random.number(1000)
    })
  }

  return quests
}

function generateQuestsIfExpired (player) {
  const now = moment.now().valueOf()
  if (moment(player.quests.availableQuests.generatedAt).add(questConfig.reset.value, questConfig.reset.unit).valueOf() <= now) {
    player.quests.availableQuests.generatedAt = now
    player.quests.availableQuests.quests = generateQuests()
  }
  return player.save()
}

module.exports = {
  getAllQuests,
  getAvailableQuests,
  getCurrentQuests
}