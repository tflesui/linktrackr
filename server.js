// This is the Web Server
const express = require('express');
const app = express();
const cors = require('cors');

// create logs for everything
const morgan = require('morgan');
app.use(morgan('dev'));

// handle application/json requests
// const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());

// here's our static files
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

// here's our API
app.use('/api', require('./routes'));

// by default serve up the react app if we don't recognize the route
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// bring in the DB connection
const { client } = require('./db/client');

// connect to the app
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await client.connect();
        console.log('Database is open for business!');
      } catch (error) {
        console.error("Database is closed for repairs!\n", error);
      }

    app.listen(PORT, async () => {
    console.log(`Server is running on ${ PORT }!`);
    
    
    });
}

module.exports = {
    app,
    startServer
}

