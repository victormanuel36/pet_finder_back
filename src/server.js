const express = require("express");
const UsersRouter = require("./routes/users.router");
const authRouter = require("./routes/auth.router");

const app = express();

app.use(express.json());


app.use("/auth", authRouter);
app.use("/users", UsersRouter);


app.get("/", (request, response) => {
    response.json({
        message: "API PetFinder",
    });
});

module.exports = app;

