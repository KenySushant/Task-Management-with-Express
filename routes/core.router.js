/**
 * @module CoreRouter
 * @description Core router of the application
 * @author Nikzzy
 */
const router = require('express').Router();

const taskRouter = require('./task.router');

router.use('/tasks', taskRouter);

module.exports = router;
