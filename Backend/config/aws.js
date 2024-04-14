// aws.js
const { S3Client } = require('@aws-sdk/client-s3');
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
const region = process.env.region;
const Bucket = process.env.Bucket;
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey:secretAccessKey,
  },
});

module.exports = s3Client;
