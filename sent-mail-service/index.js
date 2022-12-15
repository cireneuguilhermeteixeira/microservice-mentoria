require("dotenv").config();
const express = require('express')
const bodyParser = require("body-parser");
const sendMailRouter = require('./app/routes/send-mail-routes')
require("./services/consumer/templateMailConsumer")

const cors = require('cors')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const uri = '/api'

app.use(`${uri}/send-mail`,sendMailRouter)







const port = process.env.PORT || 3001
app.listen( port, ()=> console.log(`servidor rodando na porta ${port}`))

module.exports = app;
