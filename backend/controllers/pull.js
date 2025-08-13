// Import Node.js modules for file system and path manipulation
const fs = require('fs').promises;
const path = require('path');

// Import the configured S3 client and bucket name from your aws-config file
const { s3, S3_BUCKET } = require('../config/aws-config');

/**
 * Handles the 'pull' command.
 * Fetches all commit objects from S3 and recreates them locally.
 */
async function pullRepo() {
    try {
        // Define the local paths for the repository and the commits folder
        const repoPath = path.resolve(process.cwd(), ".apnagit");
        const commitsPath = path.join(repoPath, "commits");

        // Set up parameters to list all objects in the 'commits/' prefix (folder) of your S3 bucket
        const params = {
            Bucket: S3_BUCKET,
            Prefix: "commits/",
        };

        // Call the S3 API to get the list of objects and wait for the response
        const data = await s3.listObjectsV2(params).promise();

        // Extract the array of objects from the response
        const objects = data.Contents;

        // Loop through each object retrieved from S3
        for (const object of objects) {
            // Get the object's key (its full path in S3, e.g., "commits/commitId/file.txt")
            const key = object.Key;

            // Extract the commit ID and filename from the key
            const commitDir = path.dirname(key).split('/').pop();
            const fileName = path.basename(key);
            const commitDirPath = path.join(commitsPath, commitDir);

            // Create the local commit directory if it doesn't exist
            await fs.mkdir(commitDirPath, { recursive: true });

            // Set up parameters to get a specific object from S3
            const getObjectParams = {
                Bucket: S3_BUCKET,
                Key: key,
            };

            // Download the file's content from S3
            const fileData = await s3.getObject(getObjectParams).promise();

            // Write the downloaded content to a new local file
            await fs.writeFile(path.join(commitDirPath, fileName), fileData.Body);
        }
        
        console.log("All commits pulled from S3.");

    } catch (err) {
        // Log any errors that occur during the process
        console.error("Unable to pull:", err);
    }
}

module.exports = { pullRepo };