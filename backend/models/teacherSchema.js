const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Teacher"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    teachSubject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
    },
    teachSclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    // Additional fields for complete teacher information
    employeeID: {
        type: String,
        required: false,
        unique: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female', 'Other']
    },
    fatherName: {
        type: String,
        required: false
    },
    motherName: {
        type: String,
        required: false
    },
    religion: {
        type: String,
        required: false,
        enum: ['Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Sikhism', 'Judaism', 'Other']
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    section: {
        type: String,
        required: false,
        enum: ['A', 'B', 'C', 'D', 'Pink', 'Blue', 'Green', 'Yellow']
    },
    joiningDate: {
        type: Date,
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    bloodGroup: {
        type: String,
        required: false,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    shortBio: {
        type: String,
        required: false
    },
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        presentCount: {
            type: String,
        },
        absentCount: {
            type: String,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("teacher", teacherSchema)