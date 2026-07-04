const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const fileSchema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    fileId: { 
        type: String, 
        default: uuidv4, 
        index: true 
    },
    fileName: { 
        type: String, 
        required: true 
    },
    storageKey: { 
        type: String, 
        required: true 
    },
    mimeType: { 
        type: String, 
        required: true 
    },
    size: { 
        type: Number, 
        required: true 
    }
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);
module.exports = File;