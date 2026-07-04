const mongoose = require('mongoose');
const User = require('./User.js');

const Student = User.discriminator('student', new mongoose.Schema({
    usn: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    currentYear: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    branch: {
        type: String,
        required: true
    },
    counselor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'counselor'
    },
}));

module.exports = Student;