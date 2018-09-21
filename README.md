# athena-poc

This is a Proof Of Concept of using AWS S3 and Athena to store and query logs.
The vision is to use this duo to replace the current PostgreSQL db to save on costs and written code.
This part of the app is only responsible for putting data up to S3 storage.  
Querying from Athena can be done on AWS' Athena console.

Installation:

To access the project, clone the project and run 'npm install' in the project directory.

Note: if your default python installation is >= 3, one of the install dependencies will not work properly. If you do have a python2.7 executable already, just run 'npm config set python python2.7' and repeat the 'npm install'. If you do NOT have a python2.7 executable, get one.

Configuration:

This repo does not contain the AWS keys needed to put data to S3. For access to the keys file, slide into Conner Swenberg's dms on Slack.

Use:

In the project directory, execute the app by running 'node chronicle.js'.
A file, <desired-filename>.parquet, will be created and placed in the current directory and is populated with sample data.
This parquet file will also be PUT to the S3 bucket 'appdev-register' in the 'testing' folder.

You can query data put in this S3 bucket within AWS Athena. A default 'select all' query is saved in the console for example.
Athena uses standard SQL syntax for us to query. If you have any questions, feel free to slide into my dms!  
