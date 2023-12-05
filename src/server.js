const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    response.json({
        message: "API PetFinder",
    });
});

module.exports = app;

