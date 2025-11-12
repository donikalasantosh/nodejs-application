const express = require('express');
const routes = require('./routes');

const app = express();

// Middleware setup (if needed)

// Initialize routes
routes(app);

// Welcome message on server start
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log('Welcome to the Node.js server!');
});

module.exports = app;