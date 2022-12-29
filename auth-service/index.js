require("dotenv").config();
const express = require('express')
const bodyParser = require("body-parser");
const authRouter = require('./app/routes/auth-routes')

const cors = require('cors')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const uri = '/api'

app.use(`${uri}/auth`,authRouter)







const port = process.env.PORT || 3003
app.listen( port, ()=> console.log(`servidor rodando na porta ${port}`))

module.exports = app;
