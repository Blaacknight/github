Apna GitHub Clone
Welcome to Apna GitHub Clone! This is a powerful, dual-purpose application that functions both as a Git-like command-line tool for version control and as a full-featured backend server for a GitHub-inspired web application.

This project allows you to initialize repositories, add, commit, and revert changes locally, and even push/pull your commit history to an AWS S3 bucket. It also provides a robust API for user authentication, repository management, and more.

✨ Features
This project is split into two main components: a CLI tool and a backend API.

Command-Line Interface (CLI)
A fully functional version control system inspired by Git.

init: Initialize a new, empty repository (.apnagit).

add <file>: Stage a file, preparing it for the next commit.

commit <message>: Save a snapshot of the staged files.

push: Upload your entire commit history to a remote AWS S3 bucket.

pull: Download and restore the commit history from S3.

revert <commitID>: Restore your project's files to the state of a specific commit.

Backend API Server
A backend built with Node.js, Express, and MongoDB to power a web application.

User Authentication: Secure user signup and login functionality with JWT.

Repository Management: (Coming Soon) API endpoints to create, read, update, and delete repositories.

Issue Tracking: (Coming Soon) Functionality to create and manage issues for each repository.

Real-time Updates: Integrated with Socket.IO for future real-time features.

🚀 Installation and Setup
Follow these steps to get the project running on your local machine.

1. Clone the Repository
First, clone the project from GitHub to your local machine:

git clone https://github.com/your-username/apna-github-clone.git
cd apna-github-clone/backend

2. Install Dependencies
Install all the necessary npm packages:

npm install

3. Configure Environment Variables
Create a file named .env in the backend directory and add the following configuration. This is where you'll store your secret keys.

# AWS Credentials for S3 Bucket
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID_HERE
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY_HERE

# MongoDB Connection String
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING

# JWT Secret for User Authentication
JWT_SECRET=CHOOSE_A_LONG_RANDOM_SECRET_STRING

# Server Port
PORT=3000

Important: Make sure your .env file is listed in your .gitignore file to prevent your secret keys from being committed to GitHub.

🛠️ Usage
This application can be run in one of two modes: as a CLI tool or as a web server.

Using the CLI Tool
To use the version control features, run commands from your terminal in the backend directory.

Initialize a repository:

node index.js init

Add a file:

node index.js add myfile.txt

Commit your changes:

node index.js commit "My first commit"

Push to S3:

node index.js push

Running the API Server
To start the backend server for the web application:

node index.js start

The server will start on the port you defined in your .env file (e.g., http://localhost:3000).

API Endpoints
POST /user/signup: Create a new user.

POST /user/login: (Coming Soon) Log in an existing user.

GET /user/profile: (Coming Soon) Get the profile of the logged-in user.

💻 Technologies Used
Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: bcryptjs (for password hashing), JSON Web Token (JWT)

File Storage: AWS S3

Real-time: Socket.IO

CLI: yargs

🙌 Contributing
Contributions are welcome! If you have ideas for new features or improvements, feel free to fork the repository, make your changes, and open a pull request.
