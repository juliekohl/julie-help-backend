/**
 * Start Application
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require("./src/database/database");

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

apiCoworkings(app, database);
apiTeams(app, database);

/**
 * Start Server
 */

app.listen(port, () => console.log(`API listening on port ${port}!`));
