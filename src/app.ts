/**
 * Start Application
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const database = require("./database");
import libCrypto from 'crypto';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Load API endpoints
 */

import apiCoworkings from './api/coworkings'
import apiTeams from './api/teams';
import apiCoworkers from './api/coworkers';

apiCoworkings(app, database);
apiTeams(app, database, libCrypto);
apiCoworkers(app, database, libCrypto);

export default app