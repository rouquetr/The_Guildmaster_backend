const nodemailer = require('nodemailer')
const mailingConfig = require('config').mailer

const transporter = nodemailer.createTransport(mailingConfig)

const DEFAULT_OPTIONS = {
  from: `"The Guildmaster" <the_guildmaster@lo10.co>`,
  subject: '[The Guildmaster] Felicitation pour la creation de votre compte!'
}

function sendEmail (email, playerId) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(Object.assign({}, DEFAULT_OPTIONS, {
      to: email,
      html: `
      Bonjour, </br>
      Nous vous félicitons pour avoir créé votre compte sur The Guildmaster ! </br>
      Vous pouvez retrouver votre fiche de personnage ici !</br>
      ${playerId}</br>
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