const nodemailer = require('nodemailer')
const mailingConfig = require('config').mailer
const url = require('config').url

const transporter = nodemailer.createTransport(mailingConfig)

const DEFAULT_OPTIONS = {
  from: `"The Guildmaster" <raphael.rouquet@utt.fr>`,
  subject: '[The Guildmaster] Felicitation pour la creation de votre compte!'
}

function sendEmail (email, playerId, playerName) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(Object.assign({}, DEFAULT_OPTIONS, {
      to: email,
      html: `
      Bonjour ${playerName}, </br>
      Nous vous félicitons pour avoir créé votre compte sur The Guildmaster ! </br>
      Vous pouvez retrouver votre fiche de personnage <a href="${url}/player/${playerId}/complete">ici</a> !</br>
      A bientôt !
`,
    }), (err, res) => {
      if (err) reject(err)
      else resolve(res)
    })
  })
}

module.exports = {
  sendEmail
}