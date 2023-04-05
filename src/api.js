const router = require('express').Router()

const book = require('./book_dumb')

let booksDirectory = book

router.get('/books', (req, res) => {
    res.send(booksDirectory)

})

router.get('/books/:id', (req, res) => {
    const { id } = req.params
    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) {
        return res.status(404).send("Book doesn't exist")
    }

    res.send(book)

})

router.post('/books/', (req, res) => {
    const {
        title,
        isbn,
        pageCount,
        publishDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body

    bookExist = booksDirectory.find(b => b.isbn == isbn);
    if (bookExist) {

        return res.send('Book already exist')
    }
    const book = {
        title,
        isbn,
        pageCount,
        publishDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    booksDirectory.push(book)
    res.send(book)

})

router.put('/books/:id', (req, res) => {
    const { id } = req.params
    const {
        title,
        pageCount,
        publishDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body

    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) {
        return res.send('book does not exist')
    }
    const updateField = (val, prev) => !val ? prev : val;
    const updatedBook = {
        ...book,
        title: updateField(title, book.title),
        pageCount: updateField(pageCount, book.pageCount),
        publishDate: updateField(publishDate, book.publishDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        shortDescription: updateField(shortDescription, book.shortDescription),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories),
    }
    const bookIndex = booksDirectory.findIndex(b => b.isbn === id)
    booksDirectory.splice(bookIndex, 1, updatedBook)

    res.send(updatedBook)

})


router.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    let book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send("Book doesnt Exist")
    booksDirectory = booksDirectory.filter(b => b.isbn !== id)
    res.send("Success")

})

module.exports = router