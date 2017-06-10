const faker = require('faker')
const { documents, connect } = require('./index')

function populatePlayer () {
  const playerSample = {
    player: {
      name: faker.internet.userName(),
      googleId: faker.random.uuid(),
      reputation: faker.random.number(),
      money: faker.random.number()
    },
    characters: [ {
      name: faker.name.firstName(),
      class: faker.random.arrayElement([ 'Berserker', 'Sorcier', 'Clerc', 'Ranger', 'Mercenaire', 'Druide' ]),
      weaponLevel: faker.random.number(5),
      armorLevel: faker.random.number(5)
    }, {
      name: faker.name.firstName(),
      class: faker.random.arrayElement([ 'Berserker', 'Sorcier', 'Clerc', 'Ranger', 'Mercenaire', 'Druide' ]),
      weaponLevel: faker.random.number(5),
      armorLevel: faker.random.number(5)
    }, {
      name: faker.name.firstName(),
      class: faker.random.arrayElement([ 'Berserker', 'Sorcier', 'Clerc', 'Ranger', 'Mercenaire', 'Druide' ]),
      weaponLevel: faker.random.number(5),
      armorLevel: faker.random.number(5)
    } ],
    availableQuests: {
      generatedAt: faker.date.recent(),
      quests: [ {
        questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
        level: faker.random.number(5),
        length: faker.random.number(600),
        lethality: faker.random.number(),
        reward: faker.random.number()
      }, {
        questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
        level: faker.random.number(5),
        length: faker.random.number(600),
        lethality: faker.random.number(),
        reward: faker.random.number()
      }, {
        questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
        level: faker.random.number(5),
        length: faker.random.number(600),
        lethality: faker.random.number(),
        reward: faker.random.number()
      } ]
    },
    currentQuests: [ {
      endAt: faker.date.future(),
      questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
      level: faker.random.number(5),
      length: faker.random.number(600),
      lethality: faker.random.number(),
      reward: faker.random.number()
    }, {
      endAt: faker.date.future(),
      questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
      level: faker.random.number(5),
      length: faker.random.number(600),
      lethality: faker.random.number(),
      reward: faker.random.number()
    }, {
      endAt: faker.date.future(),
      questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
      level: faker.random.number(5),
      length: faker.random.number(600),
      lethality: faker.random.number(),
      reward: faker.random.number()
    } ]
  }
  return new documents.Player(playerSample).save()
}

connect().then(() => populatePlayer().then(() => process.exit(0)))
