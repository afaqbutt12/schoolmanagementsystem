const Book = require('../models/bookSchema.js');

// Create a new book
const bookCreate = async (req, res) => {
    try {
        const existingBook = await Book.findOne({
            idNo: req.body.idNo,
            school: req.body.adminID
        });

        if (existingBook) {
            return res.status(400).send({ message: 'Book with this ID already exists' });
        }

        const book = new Book({
            ...req.body,
            school: req.body.adminID
        });

        const result = await book.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(500).json({ message: 'Error creating book', error: err.message });
    }
};

// Get all books for a school
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({ school: req.params.id })
            .populate('borrower', 'name rollNum')
            .sort({ createdAt: -1 });
        
        res.send(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
};

// Get book details by ID
const getBookDetail = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('borrower', 'name rollNum sclassName')
            .populate('school', 'schoolName');
        
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }
        
        res.send(book);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book details', error: err.message });
    }
};

// Update book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('borrower', 'name rollNum sclassName');
        
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }
        
        res.send(book);
    } catch (err) {
        res.status(500).json({ message: 'Error updating book', error: err.message });
    }
};

// Delete book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }
        
        res.send({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
};

// Delete all books for a school
const deleteBooks = async (req, res) => {
    try {
        const result = await Book.deleteMany({ school: req.params.id });
        res.send({ message: `${result.deletedCount} books deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting books', error: err.message });
    }
};

// Borrow book
const borrowBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }

        if (book.status !== 'Available') {
            return res.status(400).send({ message: 'Book is not available for borrowing' });
        }

        const borrowDate = new Date();
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 14); // 14 days borrowing period

        book.status = 'Borrowed';
        book.borrower = req.body.studentId;
        book.borrowDate = borrowDate;
        book.returnDate = returnDate;

        await book.save();
        res.send({ message: 'Book borrowed successfully', book });
    } catch (err) {
        res.status(500).json({ message: 'Error borrowing book', error: err.message });
    }
};

// Return book
const returnBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }

        if (book.status !== 'Borrowed') {
            return res.status(400).send({ message: 'Book is not currently borrowed' });
        }

        book.status = 'Available';
        book.borrower = undefined;
        book.borrowDate = undefined;
        book.returnDate = undefined;

        await book.save();
        res.send({ message: 'Book returned successfully', book });
    } catch (err) {
        res.status(500).json({ message: 'Error returning book', error: err.message });
    }
};

// Get books by status
const getBooksByStatus = async (req, res) => {
    try {
        const books = await Book.find({ 
            school: req.params.id, 
            status: req.params.status 
        }).populate('borrower', 'name rollNum sclassName');
        
        res.send(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books by status', error: err.message });
    }
};

// Search books
const searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        const books = await Book.find({
            school: req.params.id,
            $or: [
                { bookName: { $regex: query, $options: 'i' } },
                { writer: { $regex: query, $options: 'i' } },
                { subject: { $regex: query, $options: 'i' } },
                { idNo: { $regex: query, $options: 'i' } }
            ]
        }).populate('borrower', 'name rollNum sclassName');
        
        res.send(books);
    } catch (err) {
        res.status(500).json({ message: 'Error searching books', error: err.message });
    }
};

module.exports = {
    bookCreate,
    getBooks,
    getBookDetail,
    updateBook,
    deleteBook,
    deleteBooks,
    borrowBook,
    returnBook,
    getBooksByStatus,
    searchBooks
};
