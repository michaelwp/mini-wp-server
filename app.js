if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

require('./config/mongoose');

const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// !important - must placed after other app.use
app.use("/", router);

module.exports = app;