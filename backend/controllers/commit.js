// backend/controllers/commit.js

const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".apnagit");
    const stagedPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");

    try {
        const commitID = uuidv4();
        const commitDirPath = path.join(commitPath, commitID);

        const files = await fs.readdir(stagedPath);

        // ✅ Check if the staging area is empty
        if (files.length === 0) {
            console.log("Staging area is empty. Nothing to commit.");
            return; // Exit the function if there are no files
        }

        await fs.mkdir(commitDirPath, { recursive: true });

        for (const file of files) {
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDirPath, file)
            );
        }

        await fs.writeFile(
            path.join(commitDirPath, "commit.json"),
            JSON.stringify({ message: message, date: new Date().toISOString() })
        );
        
        console.log(`Commit ${commitID} created with message: ${message}`);
    } catch (err) {
        console.error("Error committing files:", err);
    }
}

module.exports = { commitRepo };