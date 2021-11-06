/**
 * Start Application
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const database = require("./database");

require("dotenv").config()

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Load API endpoints
 */

import apiCoworkings from './api/coworkings'
import apiTeams from './api/teams/teams';
import apiCoworkers from './api/coworkers';

apiCoworkings(app, database);
apiTeams(app, database);
apiCoworkers(app, database);

export default app