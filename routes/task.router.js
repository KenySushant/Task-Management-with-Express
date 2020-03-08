/**
 * @module TaskRouter
 * @description Task router of the application
 * @author Nikzzy
 */
const router = require('express').Router();

const dependencies = require('./router.dependencies');

router.post('/', dependencies.taskController.createTask);

module.exports = router;
