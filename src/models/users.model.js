const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    firsName:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        trim: true,
    },

    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        trim: true,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
        trim: true
    },

});

module.exports = mongoose.model("user", usersSchema);
