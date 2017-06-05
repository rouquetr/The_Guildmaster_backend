function createPlayerSchema (mongoose, name = 'Player') {
  const PlayerSchema = new mongoose.Schema({
    player: { name: String, googleId: String, reputation: Number, money: Number },
    characters: [ { name: String, class: String, weaponLevel: Number, armorLevel: Number } ],
    availableQuests: { generatedAt: Date, Quests: [ { level: Number, length: Date, lethality: Number, reward: Number } ] }
  }, { minimize: false, strict: true })
  return mongoose.model('Player', PlayerSchema)
}

module.exports = createPlayerSchema
