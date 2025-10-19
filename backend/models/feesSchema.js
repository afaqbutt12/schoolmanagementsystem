const mongoose = require('mongoose');

const feesSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    section: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D']
    },
    expenseType: {
        type: String,
        required: true,
        enum: ['Class Test', 'Monthly Fee', 'Exam Fee', 'Library Fee', 'Transport Fee', 'Hostel Fee', 'Other']
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Overdue', 'Pending'],
        default: 'Unpaid'
    },
    paymentDate: {
        type: Date,
        required: false
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Bank Transfer', 'Card', 'Check'],
        required: false
    },
    transactionId: {
        type: String,
        required: false
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
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
feesSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("fee", feesSchema);
