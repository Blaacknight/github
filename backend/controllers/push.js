// Import Node.js modules for file system and path manipulation
const fs = require('fs').promises;
const path = require('path');

// Import the configured S3 client and bucket name from your aws-config file
const { s3, S3_BUCKET } = require('../config/aws-config');

/**
 * Handles the 'push' command.
 * Reads all local commits and uploads their files to the configured S3 bucket.
 */
async function pushRepo() {
    // Define the base paths for the repository and the commits folder
    const repoPath = path.resolve(process.cwd(), ".apnagit");
    const commitsPath = path.join(repoPath, "commits");
    try {

        // Read all the commit directories (each folder name is a commit ID)
        const commitDirs = await fs.readdir(commitsPath);

        // Loop through each commit directory
        for (const commitDir of commitDirs) {
            const commitDirPath = path.join(commitsPath, commitDir);

            // Read all the files within the current commit directory
            const files = await fs.readdir(commitDirPath);

            // Loop through each file in the commit
            for (const file of files) {
                const filePath = path.join(commitDirPath, file);
                
                // Read the content of the file
                const fileContent = await fs.readFile(filePath);

                // Set up the parameters for the S3 upload
                const params = {
                    Bucket: S3_BUCKET, // The name of your S3 bucket
                    Key: `commits/${commitDir}/${file}`, // The "folder/file" path in S3
                    Body: fileContent // The actual content of the file
                };

                // Upload the file to S3 and wait for it to complete
                await s3.upload(params).promise();
            }
        }

        // Log a success message after all commits are pushed
        console.log("All commits pushed to S3.");

    } catch (err) {
        // Log any errors that occur during the process
        console.error("Error pushing to S3: ", err);
    }
}

module.exports = { pushRepo };