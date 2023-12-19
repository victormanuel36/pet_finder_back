const User = require("../models/users.model");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");
const createError = require("http-errors");

async function login(email, password) {
    const user = await User.findOne( { email } );

    if(!user) {
        throw new createError(401, "Invalid data");
    }

    const isValidPassword = bcrypt.verify(user.password, password);

    if(!isValidPassword) {
        throw new createError(401, "invalid data");
    }

    return jwt.sign ({ id: user._id });
}

module.exports = {
    login,
}