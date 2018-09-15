const keys = require('./keys.js')
const bucketName = 'appdev-register'

module.exports = {
  json: {
    accessKeyId: keys.AccessKeyId,
    secretAccessKey: keys.SecretAccessKey
  },
  bucketName
}
