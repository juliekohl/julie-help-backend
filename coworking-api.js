const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

// Where we will keep coworkings
let coworkings = [
    {
        "name": "Impact",
    },
    {
        "name": "Aldeia",
    },
    {
        "name": "Four",
    }
];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/coworkings', (req, res) => {
    res.send('Hello World, from express');
});

app.post('/coworking', (req, res) => {
    const coworking = req.body;
    console.log('coworking', coworking);
    coworkings.push(coworking);
    console.log('coworkings', coworkings);

    res.send('Coworking is added to the database');
});

app.listen(port, () => console.log(`Hello World app listening on port ${port}!`));