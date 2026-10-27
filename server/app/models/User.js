const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // match : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email address."]
    },
    password: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Users", userSchema)