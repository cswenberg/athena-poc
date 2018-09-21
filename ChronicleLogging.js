
let AWS = require('aws-sdk')
let parquet = require('parquetjs')
let fs = require('fs')

class ChronicleLogging {

  constructor(accessKey, secretKey, app, bucket, cacheSize = 10) {
    this.path = '/tmp'
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.app = app
    this.bucket = bucket
    this.logs = []
    this.cacheSize = cacheSize

    AWS.config.update({
      accessKeyId: this.accessKey,
      secretAccessKey: this.secretKey
    })
    this.s3 = new AWS.S3()
    console.log('done constructing')
  }

  async makeParquet(eventType) {
    this.fileName = `${Date.now()}_chronicle_testing.parquet`
    let schema = new parquet.ParquetSchema(eventType)
    let writer = await parquet.ParquetWriter.openFile(schema, `${this.path}/${this.fileName}`)
    this.logs.forEach((log) => {
      writer.appendRow(log)
    })
    writer.close()
    console.log('file made')
    this.logs = []
  }
  // to be called after making parquet file
  async uploadS3() {
    const params = {
      Bucket: this.bucket,
      Body : fs.createReadStream(`${this.path}/${this.fileName}`),
      Key : `${this.app}/${this.fileName}`
    }

    const data = await this.s3.upload(params).promise();
    console.log(`Uploaded in: ${data.Location}`)
  }

  /**
  eventType: valid ParquetSchema to represent the structure of the events
  event: log that follows the eventType schema
  */
  async makeLog(eventName, eventType, event) {
    this.logs.push(event)
    if (this.logs.length>=this.cacheSize) {
      await this.makeParquet(eventType)
      this.uploadS3()
    }
  }
}

module.exports = ChronicleLogging
