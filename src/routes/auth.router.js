const express = require("express");
const authUsecase = require("../usecases/auth.usecase")

const router = express.Router();

router.post("/login", async (req, res) => {
    try {  
        const { email, password } = req.body;
        const token = await authUsecase.login(email, password);

        res.json({
            message: "logged in",
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(500);
        res.json({
            message: "something went wrong",
            error: error.message,
        });        
    }
});


module.exports = router;