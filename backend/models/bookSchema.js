const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
        enum: ['English', 'Math', 'Bangla', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Computer', 'Religion', 'Economics', 'Accounting', 'Other']
    },
    writer: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'General']
    },
    idNo: {
        type: String,
        required: false,
        unique: true
    },
    published: {
        type: Date,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    isbn: {
        type: String,
        required: false
    },
    publisher: {
        type: String,
        required: false
    },
    pages: {
        type: Number,
        required: false,
        min: 1
    },
    language: {
        type: String,
        required: false,
        enum: ['English', 'Bangla', 'Arabic', 'Hindi', 'Urdu', 'Other'],
        default: 'English'
    },
    description: {
        type: String,
        required: false
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Borrowed', 'Lost', 'Damaged'],
        default: 'Available'
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: false
    },
    borrowDate: {
        type: Date,
        required: false
    },
    returnDate: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
bookSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("book", bookSchema);
