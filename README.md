# The_Guildmaster_backend
backend server for The Guildmaster (check https://github.com/Athoir/The_Guildmaster)


routes:

`/` to check if the server is ready

##Player

###POST

`/player` to create a player, returns the complete object of the player created, the route wait a body looking like:
{ "name": "Jojo", "googleId": "f4vs548" } with the Header Content-type: application/json

###GET

`/player/:playerId` to get only the mains informations of the player
`{ name: String, googleId: String, reputation: Number, money: Number }`

`/player/:playerId/complete` to get the complete object of the player

## Quests

###GET

`/quest/:playerId` to get both available and current quests

`/quest/:playerId/available` to get the available quests
`{ generatedAt: Date, quests: [ { questType: String, level: Number, length: Number, lethality: Number, reward: Number } ] }`

`/quest/:playerId/current` to get the current quests
`[ { endAt: Date, questType: String, level: Number, length: Number, lethality: Number, reward: Number } ]`