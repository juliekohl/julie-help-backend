/**
 * Start Application
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const db = require("./database");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Load API endpoints
 */

import { coworkings } from './api/coworkings/coworkings'
import { teams } from './api/teams/teams';
import { coworkers } from './api/coworkers/coworkers';

coworkings(app, db);
teams(app, db);
coworkers(app, db);

export default app;
