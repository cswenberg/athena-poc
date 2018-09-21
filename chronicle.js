
const keys = require('./keys.js')
let ChronicleLogging = require('./ChronicleLogging.js')

const bucket = 'appdev-register'
const sampleLog = {
  app: 'Ithaca Transit',
  date: Date.now(),
  user: 'Conner Swenberg',
  bus: 69,
  distance: 17.38,
  json: {"eventType": "bus query", "event": "search bus 69"}
}

let chronicle = new ChronicleLogging(keys.accessKey, keys.secretKey, 'testing', bucket)

const schema = {
  app: { type: 'UTF8' },
  date: { type: 'INT64' },
  user: { type: 'UTF8' },
  bus: { type: 'INT64' },
  distance: { type: 'FLOAT' },
  json: { type: 'JSON' }
}

for (i=0; i<10; i++) {
  chronicle.makeLog('route query', schema, sampleLog)
}
