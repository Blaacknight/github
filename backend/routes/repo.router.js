const express = require('express');
const repoController = require("../controllers/repoController");
const repoRouter = express.Router();

// Define routes and link them to controller functions
repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepositories);
repoRouter.post("/repo/:id", repoController.fetchRepositoryById);
repoRouter.get("/repo/:name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/:userID", repoController.fetchRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", repoController.toggleVisibilityById);

module.exports = repoRouter;