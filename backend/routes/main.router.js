const express = require('express');
const userRouter = require("./user.router");
const repoRouter = require('./repo.router');
const issueRouter = require('./issue.router');

const mainRouter = express.Router();


// Any request to '/user' will be handled by the userRouter
mainRouter.use( userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);

mainRouter.get("/", (req, res) => {
    res.send("Welcome!");
});


module.exports = mainRouter;