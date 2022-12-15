require("dotenv").config();
const templateEmailRouter = require("./routes/template-email.route");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(`/api/email/template`, templateEmailRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Mongo servidor rodando na porta ${port}`));

module.exports = app;