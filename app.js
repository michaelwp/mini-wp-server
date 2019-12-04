// if (process.env.NODE_ENV === 'development') {
//     require('dotenv').config()
// }

require('dotenv').config();
require('./config/mongoose');
const errHandler = require('./middleware/errHandler');

const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// !important - must placed after other app.use
app.use("/", router);

// error handler
app.use(errHandler);

module.exports = app;