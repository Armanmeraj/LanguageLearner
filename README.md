# LanguageLearner
# My Web Application
## Project Setup
To get started with the project, follow
these steps:
1. **Clone the Repository:**
```sh
git clone <repository-url>
cd my-web-application
```

HOW TO USE:

The project has a .env file that connects to a MySQL database. The MySQL commands to construct the databases is in LanguageLearner.sql. The user needs to get their own API key from OpenAI in order to access the AI functions. Both the MySQL login info and OpenAI API key can be placed in the .env file. To run the program, simply enter the command into terminal in the local repository: 'npm run start'. The package.json scripts are optimized to run both the MySQL database and the frontend simultaneously. The program is designed to run on ports 3000 and 4000, so there may not be any other programs occupying those ports. Once the program launches, all you have to do is create an account or sign in then enjoy the application.

Functions for the API usage are created in both database.js and server.js. Database.js takes care of reaching the MySQL server and then creates a REST API to interact. In this file, the REST API made with express.js also handles server requests to OpenAI API. Server.js contains functions that make use of the REST API in order to cure the difficulty. These functions work by using POST and GET requests to the server in order to place and retrieve information. For persistence, server.js also uses a PouchDB database to store the instance of the application so when the user refreshes, the data can restore in order to provide a smooth experience.