
const keys = require('./keys.js')
const generator = require('./samples.js')
let ChronicleLogging = require('./ChronicleLogging.js')

const bucket = 'appdev-register'
let chronicleTransit = new ChronicleLogging(keys.accessKey, keys.secretKey, 'Ithaca Transit', bucket)
let chroniclePollo = new ChronicleLogging(keys.accessKey, keys.secretKey, 'Pollo', bucket)

const schemaTransit = {
  app: { type: 'UTF8' },
  date: { type: 'INT64' },
  user: { type: 'UTF8' },
  bus: { type: 'INT64' },
  distance: { type: 'FLOAT' },
  json: { type: 'JSON' }
}
const schemaPollo = {
  app: { type: 'UTF8' },
  date: { type: 'INT64' },
  user: { type: 'UTF8' },
  podcast: { type: 'UTF8' },
  duration: { type: 'FLOAT' },
  json: { type: 'JSON' }
}

let logs = generator.generateLogs()
const transit = logs.transit
const pollo = logs.pollo

for (i=0; i<10; i++) {
  chronicleTransit.makeLog('route query', schemaTransit, transit[i])
  chroniclePollo.makeLog('podcast post', schemaPollo, pollo[i])
}
