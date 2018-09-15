
const keys = require('./keys.js')
const bucketName = 'appdev-register'

const AWS = require('aws-sdk')
const parquet = require('parquetjs')
const fs = require('fs')
const path = require('path')

//configuring the AWS environment
AWS.config.update({
    accessKeyId: keys.s3AccessKeyId,
    secretAccessKey: keys.s3SecretKey
})

let s3 = new AWS.S3()
const fileName = 'reg_testing_1.parquet'
const filePath = `./${fileName}`

function makeLog(app, date, user, distance) {
  return {app, date, user, distance}
}

const log1 = makeLog('Ithaca Transit', Date.now(), 'Conner Swenberg', 12)
const log2 = makeLog('Ithaca Transit', Date.now(), 'Young Kim', 6)
const log3 = makeLog('Ithaca Transit', Date.now(), 'Austin Astorga', 9)

async function createParquet() {

  let schema = new parquet.ParquetSchema({
    app: { type: 'UTF8' },
    date: { type: 'INT64' },
    user: { type: 'UTF8' },
    distance: { type: 'INT64' }
  });

  let writer = await parquet.ParquetWriter.openFile(schema, fileName, {rowGroupSize: 4096});

  writer.appendRow(log1)
  writer.appendRow(log2)
  writer.appendRow(log3)

  writer.close()
}

//configuring parameters
async function uploadS3() {
  await createParquet()
  var params = {
    Bucket: bucketName,
    Body : fs.createReadStream(filePath),
    Key : `testing/+${fileName}_${Date.now()}`
  }

  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Uploaded in:", data.Location);
    }
  })
}

uploadS3()
