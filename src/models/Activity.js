const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({   
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },    
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    points: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'rejected']
    },
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;