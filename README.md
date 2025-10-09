# GitBucket | Version Control Application

Welcome to **Apna GitHub Clone!** — a powerful, dual-purpose application that functions both as a **Git-like command-line tool** for version control and as a **full-featured backend server** for a GitHub-inspired web application.

This project allows you to:
- Initialize repositories
- Add, commit, and revert changes locally
- Push and pull commit history to/from an **AWS S3 bucket**
- Use robust APIs for **authentication**, **repository management**, and more 🚀

---

## Features

This project is split into **two main components**:

###  Command-Line Interface (CLI)

A fully functional version control system inspired by Git:

- `init` — Initialize a new, empty repository (`.apnagit`)
- `add <file>` — Stage a file for the next commit
- `commit <message>` — Save a snapshot of staged files
- `push` — Upload your entire commit history to a remote AWS S3 bucket
- `pull` — Download and restore commit history from S3
- `revert <commitID>` — Restore project files to the state of a specific commit

---

###  Backend API Server

A backend built with **Node.js**, **Express**, and **MongoDB** to power a web application.

- **User Authentication:** Secure signup and login with **JWT**
- **Repository Management:** *(Coming Soon)* CRUD endpoints for repositories
- **Issue Tracking:** *(Coming Soon)* Create and manage issues per repository
- **Real-time Updates:** Integrated with **Socket.IO** *(future support)*

---

##  Installation & Setup

Follow these steps to get the project running locally.

###  Clone the Repository

```bash
git clone https://github.com/your-username/apna-github-clone.git
cd apna-github-clone/backend