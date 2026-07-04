const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
});

const Organisation = mongoose.model('Organisation', organisationSchema);
module.exports = Organisation;