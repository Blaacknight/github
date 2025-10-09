const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require("socket.io");
const mainRouter=require("./routes/main.router");

dotenv.config();

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { initRepo } = require('./controllers/init');
const { addRepo } = require('./controllers/add');
const { commitRepo } = require('./controllers/commit');
const { pushRepo } = require('./controllers/push');
const { pullRepo } = require('./controllers/pull');
const { revertRepo } = require('./controllers/revert');

// This function contains all the server setup and startup logic.
function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(express.json());
    app.use(cors({ origin: "*" }));

    const mongoURI = process.env.MONGODB_URI;

    mongoose.connect(mongoURI)
        .then(() => {
            console.log("MongoDB connected!");

            const server = http.createServer(app);
            
            const io = new Server(server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                }
            });

            app.use("/", mainRouter);

            io.on("connection", (socket) => {
                socket.on("joinRoom", (userID) => {
                    const user = userID;
                    console.log("=====");
                    console.log("user", user);
                    console.log("=====");
                    socket.join(userID);
                });
            });

            const db = mongoose.connection;
            db.once("open", async () => {
                console.log("CRUD operations called");
            });
            
            
            server.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });

        })
        .catch((err) => {
            console.error("Unable to connect to MongoDB:", err);
        });
}

// Yargs is used to parse command-line arguments and run the correct function
yargs(hideBin(process.argv))
    .command("start", "Starts a new server", {}, startServer)
    .command("init", "Initialise a new repository", {}, (argv) => {
        return initRepo();
    })
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