// Import the promise-based file system and path modules from Node.js
const fs = require('fs').promises;
const path = require('path');

/**
 * Initializes a new repository by creating the necessary directory structure.
 * This includes a hidden '.apnagit' folder, a 'commits' subfolder,
 * and a 'config.json' file.
 */
async function initRepo() {
    try {
        // Resolve the full path for the main hidden repository folder '.apnagit'
        const repoPath = path.resolve(process.cwd(), ".apnagit");
        
        // Resolve the full path for the 'commits' subfolder within '.apnagit'
        const commitsPath = path.join(repoPath, "commits");

        // Create the '.apnagit' directory. 'recursive: true' prevents errors if the dir already exists.
        await fs.mkdir(repoPath, { recursive: true });
        
        // Create the 'commits' directory inside '.apnagit'.
        await fs.mkdir(commitsPath, { recursive: true });

        // Create a configuration file 'config.json' inside '.apnagit'.
        // It stores necessary configuration, like the S3 bucket name.
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({ bucket: process.env.S3_BUCKET })
        );

        // Log a success message to the console
        console.log("Repository initialised!");

    } catch (err) {
        // If any error occurs during the process, log it to the console.
        console.error("Error initialising repository", err);
    }
}

// Export the initRepo function to make it available in other files
module.exports = { initRepo };