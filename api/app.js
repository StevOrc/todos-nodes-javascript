const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const debug = require('debug')('app:startup');
const cors = require('cors');
const config = require('config');

const app = express();

app.use(cors());
app.use(express.json());

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