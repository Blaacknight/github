// Import the promise-based file system and path modules from Node.js
const fs = require('fs').promises;
const path = require('path');

/**
 * Handles the 'add' command.
 * Copies a specified file into a 'staging' directory within the repository.
 * @param {string} filePath - The path to the file provided by the user.
 */
async function addRepo(filePath) {
    try {
        // Resolve the full path for the main hidden repository folder '.apnagit'
        const repoPath = path.resolve(process.cwd(), ".apnagit");
        
        // Resolve the full path for the 'staging' subfolder within '.apnagit'
        const stagingPath = path.join(repoPath, "staging");

        // Create the 'staging' directory. 'recursive: true' ensures no error if it already exists.
        await fs.mkdir(stagingPath, { recursive: true });

        // Extract just the filename from the full file path (e.g., 'hello.txt' from 'path/to/hello.txt')
        const fileName = path.basename(filePath);

        // Copy the file from its original location to the staging directory
        await fs.copyFile(filePath, path.join(stagingPath, fileName));

        // Log a success message to the console confirming the file was added
        console.log(`File ${fileName} added to the staging area!`);

    } catch (err) {
        // If any error occurs, log it to the console.
        console.error("Error adding file:", err);
    }
}

// Export the addRepo function
module.exports = { addRepo };