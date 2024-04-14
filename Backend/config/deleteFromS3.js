
const AWS = require("aws-sdk");
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
const region = process.env.region;
const Bucket = process.env.Bucket;


AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

const s3 = new AWS.S3();

const deleteFromS3 = async (keys) => {
  const params = {
    Bucket:Bucket,
    Delete: {
      Objects: keys.map((key) => ({ Key: key })),
      Quiet: false, // Set to true to suppress errors if some objects don't exist
    },
  };

  return new Promise((resolve, reject) => {
    s3.deleteObjects(params, (err, data) => {
      if (err) {
        console.error("Error deleting objects from S3:", err);
        reject(err);
      } else {
        console.log("Objects deleted from S3 successfully:", data.Deleted);
        resolve(data);
      }
    });
  });
};

module.exports =  deleteFromS3;
