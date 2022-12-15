const mongoose = require("mongoose");


mongoose
    .connect(process.env.DB_HOST || "mongodb://localhost/microservice-template-email", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((connection) => {
        console.log("conneted succesfully");
    })
    .catch((error) => {
        console.error("error to connect", error);
    });

module.exports = mongoose;