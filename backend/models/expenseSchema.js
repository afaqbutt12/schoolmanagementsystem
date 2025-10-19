const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expenseType: {
        type: String,
        required: true,
        enum: ['Salary', 'Transport', 'Utilities', 'Maintenance', 'Office Supplies', 'Insurance', 'Marketing', 'Equipment', 'Software', 'Training', 'Other']
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Paid', 'Due', 'Overdue'],
        default: 'Due'
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        lowercase: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        required: false
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
    receiptNumber: {
        type: String,
        required: false
    },
    vendor: {
        type: String,
        required: false
    },
    category: {
        type: String,
        enum: ['Operational', 'Administrative', 'Academic', 'Infrastructure', 'Marketing', 'Other'],
        default: 'Operational'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
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
expenseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("expense", expenseSchema);
