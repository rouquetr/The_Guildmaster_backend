const uuidV4 = require('uuid/v4')
const faker = require('faker')
const moment = require('moment')
const questConfig = require('config').quest
const find = require('lodash').find
const reject = require('lodash').reject

const { documents } = require('../db')

function getAllQuests (playerId) {
  return documents.Player.findById(playerId)
    .then(player => generateQuestsIfExpired(player))
    .then(player => player.quests)
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
    const quest = {
      id: uuidV4(),
      questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
      level: faker.random.number(4) + 1,
      length: faker.random.number(540) + 60,
      reward: faker.random.number(900) + 100
    }
    quest.lethality = quest.level * 20
    quests.push(quest)
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

function startQuest (playerId, questId, characters) {
  return documents.Player.findById(playerId)
    .then(player => {
      const matchingQuest = find(player.quests.availableQuests.quests, { id: questId })
      const availableQuestsUpdated = reject(player.quests.availableQuests.quests, { id: questId })

      if (!matchingQuest) {
        throw new Error('no matching Quest')
      }

      const startedQuest = {
        id: questId,
        endAt: moment().add(matchingQuest.length, 'seconds'),
        questType: matchingQuest.questType,
        level: matchingQuest.level,
        length: matchingQuest.length,
        lethality: matchingQuest.lethality,
        reward: matchingQuest.reward,
        characters
      }

      player.quests.currentQuests.push(startedQuest)
      player.quests.availableQuests.quests = availableQuestsUpdated
      return player.save()
    })
    .then(player => player.quests.currentQuests)
}

function validateQuest (playerId, questId) {
  return documents.Player.findById(playerId)
    .then(player => {

      const matchingQuest = find(player.quests.currentQuests, { id: questId })

      if (matchingQuest && moment(matchingQuest.endAt).valueOf() <= moment.now().valueOf()) {
        const currentQuestsUpdated = reject(player.quests.currentQuests, { id: questId })
        player.player.money += matchingQuest.reward
        player.player.reputation += matchingQuest.reward
        player.quests.currentQuests = currentQuestsUpdated
        return player.save()
          .then(() => ({ message: 'Quest Finished, reward successfully claimed' }))
      }

      throw new Error('no quest finished with this id')
    })
}

module.exports = {
  getAllQuests,
  getAvailableQuests,
  getCurrentQuests,
  startQuest,
  validateQuest
}