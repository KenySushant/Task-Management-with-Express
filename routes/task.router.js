/**
 * @module TaskRouter
 * @description Task router of the application
 * @author Nikzzy
 */
const router = require('express').Router();

const { validationMiddleware } = require('./../middlewares');
const dependencies = require('./router.dependencies');

router.post('/', validationMiddleware({
    title: {
        type: 'string',
        trim: true,
        min: 1,
        max: 20,
    },
    description: {
        type: 'string',
        trim: true,
        min: 1,
        max: 200,
    },
}), dependencies.taskController.createTask);

router.get('/', dependencies.taskController.getAllTasks);

router.get('/:id', dependencies.taskController.getTaskById);

router.patch('/:id/status', validationMiddleware({
    status: {
        type: 'enum',
        values: ['New', 'In-Progress', 'Completed'],
    },
}), dependencies.taskController.updateTaskStatusById);

router.delete('/:id', dependencies.taskController.deleteTaskById);

module.exports = router;
