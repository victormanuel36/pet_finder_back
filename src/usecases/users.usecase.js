const mongoose = require("mongoose");
const User = require("../models/users.model");
const createError = require("http-errors");
const bcrypt = require("../lib/bcrypt");



async function getAll() {
    const allusers = await User.find();
    return allusers;
};

async function create(userData) {
    //validadr si un usuario existe
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
        throw new createError(412, "email already registered") 
    }

    const passwordRegex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-.+]).{8,}$"
    );

    if (!passwordRegex.test(userData.password)) {
        throw new createError(400, "password too weak")
    }

    // guardar password
    userData.password = bcrypt.encrypt(userData.password);

    const newuser = await User.create(userData);
    return newuser;

}

async function getById(id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new createError(400, "invalid id");
    }

    const user = await User.findById(id);

    if(!user) {
        throw new createError(404, "user not found");
    }
    return user;
};

async function deleteById(id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new createError(400, "invalid id");
    }
    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
        throw new createError(404, "user not found");
    }

    return userDeleted
}

async function updateById(id, dataToUpdate) {
    if(!mongoose.isValidObjectId(id)) {
        throw new createError(400, "invalid id");
    }

    const userUpdated = await User.findByIdAndUpdate(id, dataToUpdate, { 
        new: true,
        runValidators: true,
    }); 



    if(!userUpdated) {
        throw new createError(404, "user not found")
    }

    return userUpdated
}



module.exports = {
    getAll,
    create,
    getById,
    deleteById,
    updateById
}