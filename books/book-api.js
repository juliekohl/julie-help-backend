const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let books = [
    {
        "isbn": "9781593275846",
        "title": "Eloquent JavaScript, Second Edition",
    },
    {
        "isbn": "9781449331818",
        "title": "Learning JavaScript Design Patterns",
    },
    {
        "isbn": "9781449365035",
        "title": "Speaking JavaScript",
    }
];

/**
 * Retrieve all
 * GET /books
 */
app.get('/books', (req, res) => {
    res.json(books);
});

/**
 * Retrieve single
 * GET /book/:isbn
 */
app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    for (let book of books) {
        if (book.isbn === isbn) {
            return res.json(book);
        }
    }

    res.status(404).send({
        message: "Not found"
    });
});

/**
 * Create
 * POST /book { isbn, title }
 */
app.post('/book', (req, res) => {
    const book = req.body;
    books.push(book);

    res.send(book);
});

/**
 * Update
 * POST /book/:isbn { title }
 */
app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books[i].title = newBook.title;

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
 * DELETE /book/:isbn
 */
app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    books = books.filter(i => {
        return i.isbn !== isbn;
    });

    res.send({
        message: "Deleted"
    });
});

app.listen(port, () => console.log(`Books listening on port ${port}!`));
