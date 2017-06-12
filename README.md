# The_Guildmaster_backend
backend server for The Guildmaster (check https://github.com/Athoir/The_Guildmaster)

## How to install the server:

- Have node.js and mongoDB installed on your computer
- clone the git repository
- type on your CLI `npm install` when you are in the folder of the repository
- run mongoDB and type `npm run start` to run the server
- the default port for the server is `localhost:3000` to change it, go in `/config/default.json` and change the `port` value

## Config

If you want to change the reset timer for quests, go into `/config/default.json` and change the fields `value` and/or `unit`
in the object `quest.reset`

## API:

#### GET

`/` to check if the server is ready

### Player

#### POST

`/player` to create a player, returns the complete object of the player created, the route wait a body looking like:
`{ "name": "Jojo", "googleId": "f4vs548" }` with the Header `Content-type: application/json`

#### GET

`/player/login/:googleId` to check if the player has an account assigned to his googleId
returns a status code 200 with the _id of the player if one has been found
if no player has been found, returns a code 404 with an _id: null

`/player/:playerId` to get only the mains informations of the player
`{ name: String, googleId: String, reputation: Number, money: Number }`

`/player/:playerId/complete` to get the complete object of the player

### Quests

#### GET

`/player/:playerId/quest` to get both available and current quests

`/player/:playerId/quest/available` to get the available quests
`{ generatedAt: Date, quests: [ { questType: String, level: Number, length: Number, lethality: Number, reward: Number } ] }`

`/player/:playerId/quest/current` to get the current quests
`[ { endAt: Date, questType: String, level: Number, length: Number, lethality: Number, reward: Number } ]`