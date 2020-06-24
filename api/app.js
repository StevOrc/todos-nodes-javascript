const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const debug = require('debug')('app:startup');
const cors = require('cors');
const config = require('config');
const article = require('./routes/article.route');

// Create app instance
const app = express();

// Use basic middlewares
app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/articles', article);

mongoose.connect(config.get('db'), {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then( () => {
        debug(`Connected to Mongodb in '${config.get('dbName').toUpperCase()}' database`);
    })
    .catch( err => {
        debug(err);
    });

const port = process.env.PORT || 3000;

app.listen( port, () => {
    debug(`listening on port ${port}`);
})