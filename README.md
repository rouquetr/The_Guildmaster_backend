# The_Guildmaster_backend
backend server for The Guildmaster (check https://github.com/Athoir/The_Guildmaster)


routes:

`/` to check if the server is ready

`/player` to create a player, returns the complete object of the player created, the route wait a body looking like:
{ "name": "Jojo", "googleId": "f4vs548" } with the Header Content-type: application/json

`/player/:id` to get only the mains informations of the player (money, reputation, googleId, name)

`/player/:id/complete` to get the complete object of the player