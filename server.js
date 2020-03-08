/**
 * @module Server
 * @description Startpoint of the application
 * @author Nikzzy
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./routes');

// Load environment
require('dotenv').config();

// Configure express
const app = express();

app.use(bodyParser.json());

// Routes
app.use('/', router);

// Not found route handler
app.use((req, res, next) => { // eslint-disable-line
    return res.status(404).send({
        error: 'Not Found',
        message: 'Requested resource not found',
    });
});

// Error handling route
app.use((err, req, res, next) => { // eslint-disable-line
    console.log(`Timestamp: ${new Date()}`);
    console.error(err);
    return res.status(500).send({
        error: 'Internal Server Error',
        message: 'Something went wrong, please try again later',
    });
});

// Connect to the database
mongoose
    .connect('mongodb://localhost:27017/TaskManagement', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database server');
        app.listen(process.env.PORT || 8000, () => {
            console.log('App running on http://localhost:8000');
        });
    })
    .catch((err) => {
        console.error(err);
    });
