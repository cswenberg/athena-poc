const AWS = require('aws-sdk')
const config = require('./awsConfig.js')
const parquet = require('parquetjs')
const fs = require('fs')

if (process.argv.length < 3) {
  console.log('please give filename to create (omit .parquet)\n','EX: node index.js <filename>')
  process.abort()
}
const fileName = `${process.argv[2]}.parquet`
const filePath = `./${fileName}`

//configuring the AWS environment
AWS.config.update(config.json)
let s3 = new AWS.S3()

function makeLog(app, date, user, bus, distance) {
  return {app, date, user, bus, distance}
}
//athena crashed on query with a distance value > 420 !!!
const log1 = makeLog('Ithaca Transit', Date.now(), 'Conner Swenberg', 82, 6.9)
const log2 = makeLog('Ithaca Transit', Date.now(), 'Young Kim', 30, 8.0)
const log3 = makeLog('Ithaca Transit', Date.now(), 'Austin Astorga', 72, 11.1)
const logs = [log1, log2, log3]

async function createParquet() {
  let schema = new parquet.ParquetSchema({
    app: { type: 'UTF8' },
    user: { type: 'UTF8' },
    date: { type: 'INT64' },
    bus: { type: 'INT64' },
    distance: { type: 'FLOAT' }
  });

  let writer = await parquet.ParquetWriter.openFile(schema, fileName, {rowGroupSize: 4096});
  logs.forEach((log) => {
    writer.appendRow(log)
  })

  writer.close()
}

function uploadS3() {
  var params = {
    Bucket: config.bucketName,
    Body : fs.createReadStream(filePath),
    Key : `testing/${Date.now()}_${fileName}` //will put file in testing dir in s3 bucket
  }

  s3.upload(params, (err, data) => {
    if (err) console.log("Error", err)
    if (data) console.log("Uploaded in:", data.Location);
  })
}

async function sendData() {
  await createParquet()
  uploadS3()
}

sendData()
