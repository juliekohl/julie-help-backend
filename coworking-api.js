const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require("./database");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Retrieve all
 * GET /coworkings
 */
app.get('/coworkings', (req, res) => {
    database
        .select("*")
        .into("coworkings")
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
});

/**
 * Retrieve single
 * GET /coworking/:id
 */
app.get('/coworking/:id', (req, res) => {
    const id = req.params.id;
    database
        .select("*")
        .table("coworkings")
        .where('id', id)
        .orderBy("name", "asc")
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

/**
 * Create
 * POST /coworking { id, name }
 */
app.post('/coworking', (req, res) => {
    const coworking = req.body;
    database
        .insert(coworking)
        .into("coworkings")
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
});

/**
 * Update
 * POST /coworking/:id { name }
 */
app.post('/coworking/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    database
        .update(newData)
        .table("coworkings")
        .where({id: id})
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
});

/**
 * Delete
 * DELETE /coworking/:id
 */
app.delete('/coworking/:id', (req, res) => {
    const id = req.params.id;

    database
        .delete()
        .table("coworkings")
        .where({id: id})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(port, () => console.log(`Coworkings listening on port ${port}!`));
