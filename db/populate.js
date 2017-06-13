const faker = require('faker')
const { documents, connect } = require('./index')

function populatePlayer () {
  const playerSample = {
    player: {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      googleId: faker.random.uuid(),
      reputation: faker.random.number(),
      money: faker.random.number()
    },
    characters: [ {
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      class: faker.random.arrayElement([ 'Berserker', 'Sorcier', 'Clerc', 'Ranger', 'Mercenaire', 'Druide' ]),
      weaponLevel: faker.random.number(5),
      armorLevel: faker.random.number(5)
    }, {
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      class: faker.random.arrayElement([ 'Berserker', 'Sorcier', 'Clerc', 'Ranger', 'Mercenaire', 'Druide' ]),
      weaponLevel: faker.random.number(5),
      armorLevel: faker.random.number(5)
    }, {
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      class: faker.random.arrayElement([ 'Berserker', 'Sorcier', 'Clerc', 'Ranger', 'Mercenaire', 'Druide' ]),
      weaponLevel: faker.random.number(5),
      armorLevel: faker.random.number(5)
    } ],
    quests: {
      availableQuests: {
        generatedAt: faker.date.recent(),
        quests: [ {
          id: faker.random.uuid(),
          questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
          level: faker.random.number(5),
          length: faker.random.number(600),
          lethality: faker.random.number(),
          reward: faker.random.number()
        }, {
          id: faker.random.uuid(),
          questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
          level: faker.random.number(5),
          length: faker.random.number(600),
          lethality: faker.random.number(),
          reward: faker.random.number()
        }, {
          id: faker.random.uuid(),
          questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
          level: faker.random.number(5),
          length: faker.random.number(600),
          lethality: faker.random.number(),
          reward: faker.random.number()
        } ]
      },
      currentQuests: [ {
        id: faker.random.uuid(),
        endAt: faker.date.future(),
        questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
        level: faker.random.number(5),
        length: faker.random.number(600),
        lethality: faker.random.number(),
        reward: faker.random.number()
      }, {
        id: faker.random.uuid(),
        endAt: faker.date.future(),
        questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
        level: faker.random.number(5),
        length: faker.random.number(600),
        lethality: faker.random.number(),
        reward: faker.random.number()
      }, {
        id: faker.random.uuid(),
        endAt: faker.date.future(),
        questType: faker.random.arrayElement([ 'E', 'R', 'C' ]),
        level: faker.random.number(5),
        length: faker.random.number(600),
        lethality: faker.random.number(),
        reward: faker.random.number()
      } ]
    }
  }
  playerSample.quests.currentQuests.map((element, index) => {
    playerSample.quests.currentQuests[ index ].characters = [ playerSample.characters[ index ].id ]
  })
  return new documents.Player(playerSample).save()
}

connect().then(() => populatePlayer().then(() => process.exit(0)))
