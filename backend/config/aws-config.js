// backend/config/aws-config.js

// Load environment variables from the .env file. MUST be at the top.
require('dotenv').config();

const AWS = require('aws-sdk');

// The SDK will now automatically find and use the credentials from the .env file
AWS.config.update({
    region: "ap-south-1" 
});

const s3 = new AWS.S3();

// Remember to replace this with your actual bucket name if you haven't already
const S3_BUCKET = "mysamplebucketshahbas";

module.exports = {
    s3,
    S3_BUCKET
};