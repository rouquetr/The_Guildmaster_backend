const { documents } = require('../db')
const faker = require('faker')
const uuidV4 = require('uuid/v4')

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

module.exports = {
  getAllCharacters,
  recruitCharacter
}