const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let coworkings = [
    {
        "id": "275846",
        "name": "Next Coworking",
    },
    {
        "id": "431818",
        "name": "Four",
    },
    {
        "id": "965035",
        "name": "Impact Hub",
    }
];

/**
 * Retrieve all
 * GET /coworkings
 */
app.get('/coworkings', (req, res) => {
    res.json(coworkings);
});

/**
 * Retrieve single
 * GET /coworking/:id
 */
app.get('/coworking/:id', (req, res) => {
    const id = req.params.id;

    for (let coworking of coworkings) {
        if (coworking.id === id) {
            return res.json(coworking);
        }
    }

    res.status(404).send({
        message: "Not found"
    });
});

/**
 * Create
 * POST /coworking { id, name }
 */
app.post('/coworking', (req, res) => {
    const coworking = req.body;
    coworkings.push(coworking);

    res.send(coworking);
});

/**
 * Update
 * POST /coworking/:id { name }
 */
app.post('/coworking/:id', (req, res) => {
    const id = req.params.id;
    const newCoworking = req.body;

    for (let i = 0; i < coworkings.length; i++) {
        let coworking = coworkings[i]
        if (coworking.id === id) {
            coworkings[i].name = newCoworking.name;

            return res.send({
                message: "Updated"
            });
        }
    }

    res.status(404).send({
        message: "Not found"
    });
});

/**
 * Delete
 * DELETE /coworking/:id
 */
app.delete('/coworking/:id', (req, res) => {
    const id = req.params.id;

    coworkings = coworkings.filter(i => {
        return i.id !== id;
    });

    res.send({
        message: "Deleted"
    });
});

app.listen(port, () => console.log(`Coworkings listening on port ${port}!`));
