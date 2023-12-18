const express = require("express");
const users = require("../usecases/users.usecase");


const router = express.Router();

// List Users
router.get("/" , async (req, res) => {
    try {
        const allUsers = await users.getAll();

    res.json({
        message: "users List",
        data:{
            users: allUsers,
        },
    });

    } catch (error) {
        res.status(500);
        res.json({
            message:"something went wrong",
            error:error.mesage,
        });
    }

});


// create Users
router.post("/", async (req, res) =>{
    try{
        const userData = req.body;
        const newUser = await users.create(userData);

        res.status(201)
        res.json({
            message: "koder Created",
            data:{
                user:newUser,
            },
        });
    }   catch (error) {
        const status = error.name === "validationError" ? 400 : 500
        res.status(status);
        res.json({
            message: "something went wrong",
            error: error.mesage,
        });
    }

});

router.get("/:id", async (req, res) =>{
    try {
        const id = req.params.id;
        const user = await users.getById(id);

        res.json({
            message:`koder ${user.id}` ,
            data: { user },
        });
    }   catch (error) {
        res.status(error.status || 500);
        res.json({
            message: "something went wron",
            error: error.message,
        });
    }
});

router.delete("/:id" , async (req, res) => {
    try {
        const { id } = req.params;
        const userDeleted = await users.deleteById(id)

        res.json({
            message: "user Deleted",
            data: {
                user: userDeleted,
            }
        });

    } catch (error) {
        res.status(error.status || 500)
        res.json({
            message: "somothing went wrong",
            error:error.message,
        });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const userUpdated = await users.updateById(id, data);

        res.json({
            message: "user updated",
            data: {
                user: userUpdated,
            }
        });

    } catch (error) {
        const status = error.name === "ValidationError" ? 400 : 500;
        res.status(error.status || status)
        res.json({
            message: "something wont wrong",
            error: error.message,
        });
    }
});



module.exports = router;