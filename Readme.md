# Cypress API Testing Project

This project contains automated tests for API testing using Cypress. The repository can be cloned and configured for different environments (development and staging) using cross-env for environment variable management.

## Prerequisites

Ensure the following are installed on your machine:

- **Git**: Required for cloning the repository. [Download and install Git](https://git-scm.com/downloads).
- **Node.js**: Required to run Cypress and other dependencies. [Download and install Node.js](https://nodejs.org/en/download/).

## Getting Started

### 1. Clone the Repository

Use the following command to clone the repository:

git clone https://github.com/salan22/cypress-api-testing.git
cd cypress-api-testing

### 2. Install Dependencies
Once inside the project directory, install the necessary dependencies by running:

npm install

### 3. Run Cypress Tests
### 3.1 Open Cypress Test Runner
For development environment:
npm run cy:dev

For staging environment:
npm run cy:staging

### 3.2 Run Cypress Tests in Headless Mode
npm run cy:run:dev

npm run cy:run:staging
