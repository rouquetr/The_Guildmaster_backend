const config = require('config').db
const mongoose = require('mongoose')
const documents = require('./documents')(mongoose)
mongoose.Promise = global.Promise
function connectMongoose () {
  return mongoose.connect(config.uri, config.options).connection
}
/**
 * Connect to the mongoose database.
 * @return {Promise} - A promise of the connection.
 */
function connect () {
  return new Promise((resolve, reject) => {
    console.log('------------------------')
    console.log('📡  MONGO:')
    console.log(`  uri: ${config.uri}`)
    console.log(`  options: ${ config.options ? JSON.stringify(config.options) : 'none' }`)
    console.log('------------------------')

    connectMongoose()
      .on('error', err => {
        console.log(`📡  MONGO: ERROR ${err}`)
        reject(err)
      })
      .on('disconnected', connectMongoose)
      .once('open', d => {
        console.log(`📡  MONGO: connection successfull ${d}`)
        resolve(d)
      })
  })
}

exports.connect = connect
exports.documents = documents
