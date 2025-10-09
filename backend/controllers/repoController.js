 const createRepository = (req, res) => {
    res.send("Reposiyory is created");
}; 

const getAllRepositories = (req, res) => {
    res.send("All Repositories fetched");
}; 

const fetchRepositoryById = (req, res) => {
    res.send("repository details fetched");
}; 

const fetchRepositoryByName = (req, res) => {
    res.send("repository details fetched");
}; 

const fetchRepositoryForCurrentUser = (req, res) => {
    res.send("repositories for Logged in user Fetched!");
}; 

const updateRepositoryById  = (req, res) => {
    res.send("repository updated");
}; 

const toggleVisibilityById  = (req, res) => {
    res.send("Visibility Toggled");
}; 

const deleteRepositoryById  = (req, res) => {
    res.send("repository deleted");
}; 


module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById,
};





