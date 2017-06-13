const { documents } = require('../db')
const faker = require('faker')
const uuidV4 = require('uuid/v4')
const find = require('lodash').find
const reject = require('lodash').reject

function getAllCharacters (playerId) {
  return documents.Player.findById(playerId)
    .then(player => player.characters)
}

function recruitCharacter (playerId, characterClass) {
  const character = {
    id: uuidV4(),
    name: faker.name.firstName(),
    class: characterClass,
    weaponLevel: 1,
    armorLevel: 1
  }

  return documents.Player.findById(playerId)
    .then(player => {
      player.characters.push(character)
      return player.save()
    })
    .then(player => player.characters)
}

function upgradeCharacter (playerId, characterId, cost, weaponLevel, armorLevel) {
  return documents.Player.findById(playerId)
    .then(player => {
      if (player.player.money < cost) throw new Error('not enough money')
      const matchingCharacter = find(player.characters, { id: characterId })
      if (!matchingCharacter) throw new Error('No character Found')
      const charactersUpdated = reject(player.characters, { id: characterId })
      const characterUpdated = {
        id: matchingCharacter.id,
        name: matchingCharacter.name,
        class: matchingCharacter.class,
        weaponLevel,
        armorLevel
      }
      charactersUpdated.push(characterUpdated)
      player.characters = charactersUpdated
      player.player.money -= cost
      return player.save()
    })
    .then(player => player.characters)
}

module.exports = {
  getAllCharacters,
  recruitCharacter,
  upgradeCharacter
}