const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { initRepo } = require('./controllers/init');
const { addRepo } = require('./controllers/add');
const { commitRepo } = require('./controllers/commit');
const { pushRepo } = require('./controllers/push');
const { pullRepo } = require('./controllers/pull');
const { revertRepo } = require('./controllers/revert'); // Ensure revertRepo is imported

yargs(hideBin(process.argv))
    .command("init", "Initialise a new repository", {}, initRepo)

    .command("add <file>", "Add a file to the repository", (yargs) => {
        yargs.positional("file", {
            describe: "File to add to the staging area",
            type: "string",
        });
    }, (argv) => {
        return addRepo(argv.file);
    })

    .command("commit <message>", "Commit the staged files", (yargs) => {
        yargs.positional("message", {
            describe: "Commit message",
            type: "string",
        });
    }, (argv) => {
        return commitRepo(argv.message);
    })
    
    .command("push", "Push commits to S3", {}, () => {
        return pushRepo();
    })

    .command("pull", "Pull commits from S3", {}, () => {
        return pullRepo();
    })

    // ✅ The handler for the 'revert' command.
    // This passes the commitID argument to the revertRepo function
    // and returns the promise to ensure the program waits.
    .command("revert <commitID>", "Revert to a specific commit", (yargs) => {
        yargs.positional("commitID", {
            describe: "Commit ID to revert to",
            type: "string",
        });
    }, (argv) => {
        return revertRepo(argv.commitID);
    })

    .demandCommand(1, "You need at least one command")
    .help()
    .argv;