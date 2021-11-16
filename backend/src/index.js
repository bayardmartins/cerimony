require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(routes)
//app.use(TextDecoder, TextEncoder)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Running on port ' + PORT)
})