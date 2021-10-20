/**
 * Start Application
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require("./src/database/database");
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Load API endpoints
 */

const apiCoworkings = require('./src/api/coworkings');
const apiTeams = require('./src/api/teams');
const apiCoworkers = require('./src/api/coworkers');

apiCoworkings(app, database);
apiTeams(app, database, crypto);
apiCoworkers(app, database, crypto);

/**
 * Start Server
 */

app.listen(port, () => console.log(`API listening on port ${port}!`));
