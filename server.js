const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Define your Express route
    server.get('/docker', (req, res) => {
        res.json({ message: "docker docked" });
    });

    // Handle all other requests with Next.js
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // Start the server
    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
/*
Importing Required Modules:

express: This is a web framework for Node.js that simplifies the creation of web servers and APIs.
next: This is the Next.js framework, which is used for building server-rendered React applications.
Environment Setup:

The variable dev is set to true if the application is not in production mode. This is determined by checking the NODE_ENV environment variable.
Next.js App Preparation:

const app = next({ dev });: This initializes a Next.js application instance, allowing it to be used in the server.
const handle = app.getRequestHandler();: This creates a request handler that will be used to handle all requests that are not explicitly defined in the Express routes.
Server Preparation:

app.prepare().then(() => { ... });: This prepares the Next.js application, ensuring that it is ready to handle requests. The code inside the then block will run once the app is prepared.
Creating an Express Server:

const server = express();: This creates an instance of an Express server.
Defining a Route:

server.get('/docker', (req, res) => { ... });: This defines a GET route at the /docker endpoint. When a client makes a GET request to this endpoint, the server responds with a JSON object: { message: "docker docked" }.
Handling All Other Requests:

server.all('*', (req, res) => { return handle(req, res); });: This line tells the Express server to handle all other requests (that are not specifically defined) using the Next.js request handler. This allows Next.js to serve its pages and assets.
Starting the Server:

server.listen(3000, (err) => { ... });: This starts the Express server on port 3000. If there is an error starting the server, it throws the error. Otherwise, it logs a message indicating that the server is ready and listening for requests.
 */