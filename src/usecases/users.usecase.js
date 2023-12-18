const mongoose = require("mongoose")
const User = require("../models/users.model");
const createError = require("http-errors");


async function getAll() {
    const allusers = await User.find();
    return allusers;
};

async function create(userData) {
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