// Import Node.js modules for file system and path manipulation
const fs = require('fs').promises;
const path = require('path');

/**
 * Handles the 'revert' command.
 * Reverts the current project files back to the state of a specific commit.
 * @param {string} commitID - The ID of the commit to revert to.
 */
async function revertRepo(commitID) {
    try {
        // Define the path to the main repository folder (.apnagit)
        const repoPath = path.resolve(process.cwd(), ".apnagit");

        // Construct the full path to the specific commit directory using the provided commitID
        const commitDirPath = path.join(repoPath, "commits", commitID);

        // Define the path to the parent directory (your main project folder)
        const parentDir = path.resolve(repoPath, "..");

        // Read all the files from the specified commit directory
        const files = await fs.readdir(commitDirPath);

        // Loop through each file in the commit
        for (const file of files) {
            // Skip the commit metadata file
            if (file === "commit.json") {
                continue;
            }

            // Copy each file from the commit directory back to your main project directory
            await fs.copyFile(
                path.join(commitDirPath, file),
                path.join(parentDir, file)
            );
        }

        console.log(`Successfully reverted to commit ${commitID}`);
    } catch (err) {
        // Log any errors that occur
        console.error("Unable to revert:", err);
    }
}

module.exports = { revertRepo };