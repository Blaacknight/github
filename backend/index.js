const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { initRepo } = require('./controllers/init');
const { addRepo } = require('./controllers/add');
const { commitRepo } = require('./controllers/commit');
const { pushRepo } = require('./controllers/push');
const { pullRepo } = require('./controllers/pull'); // Ensure pullRepo is imported
const { revertRepo } = require('./controllers/revert');

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

    // ✅ The handler for the 'pull' command.
    // We return the function call to wait for the download to finish.
    .command("pull", "Pull commits from S3", {}, () => {
        return pullRepo();
    })

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