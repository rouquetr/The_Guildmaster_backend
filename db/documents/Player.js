function createPlayerSchema (mongoose, name = 'Player') {
  const PlayerSchema = new mongoose.Schema({
    player: { name: String, googleId: String, reputation: Number, money: Number },
    characters: [ { id: String, name: String, class: String, weaponLevel: Number, armorLevel: Number } ],
    quests: {
      availableQuests: { generatedAt: Date, quests: [ { id: String, questType: String, level: Number, length: Number, lethality: Number, reward: Number } ] },
      currentQuests: [ { id: String, endAt: Date, questType: String, level: Number, length: Number, lethality: Number, reward: Number } ]
    }
  }, { minimize: false, strict: true })
  return mongoose.model('Player', PlayerSchema)
}

module.exports = createPlayerSchema
