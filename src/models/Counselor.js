const mongoose = require('mongoose');
const User = require('./User.js');

const Counselor = User.discriminator('counselor', new mongoose.Schema({
    department: {
        type: String,
        trim: true
    }
}));

module.exports = Counselor;