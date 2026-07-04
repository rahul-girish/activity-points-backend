const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const baseOptions = {
    discriminatorKey: 'role', 
    collection: 'users',
    timestamps: true
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() { return !this.googleId; },
        select: false
    },
    googleId: {
        type: String,
        unique: true, 
        sparse: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, baseOptions);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.log("Error: ", error.message);
        next(error);
    }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;