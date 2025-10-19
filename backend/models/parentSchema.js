const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    occupation: {
        type: String,
        required: false
    },
    idNo: {
        type: String,
        required: false,
        unique: true
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    religion: {
        type: String,
        required: true,
        enum: ['Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Sikhism', 'Judaism', 'Other']
    },
    email: {
        type: String,
        required: false,
        unique: true,
        lowercase: true
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    shortBio: {
        type: String,
        required: false
    },
    photo: {
        type: String, // Store file path or URL
        required: false
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    // Reference to students (children)
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    }],
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
parentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("parent", parentSchema);
