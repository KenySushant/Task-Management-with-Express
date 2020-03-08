/**
 * @module TaskController
 * @description Task Controller
 * @author Nikzzy
 */
const { ObjectID } = require('mongodb');

const { TaskModel } = require('./../models');

const createTask = async (req, res, next) => {
    try {
        // Destruct title, description from Request's body
        const {
            title,
            description,
        } = req.body;

        // Save task into the database
        const task = new TaskModel();

        task.title = title;
        task.description = description;

        const savedTask = await task.save();

        return res.status(201).send(savedTask);
    } catch (error) {
        return next(error);
    }
};

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find();
        return res.status(200).send(tasks);
    } catch (error) {
        return next(error);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send({
                error: 'Not Found',
                message: `Task with id '${id}' not found`,
            });
        }

        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).send({
                error: 'Not Found',
                message: `Task with id '${id}' not found`,
            });
        }

        return res.status(200).send(task);
    } catch (error) {
        return next(error);
    }
};

const updateTaskStatusById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send({
                error: 'Not Found',
                message: `Task with id '${id}' not found`,
            });
        }

        const task = await TaskModel.findByIdAndUpdate(id, {
            status,
        }, {
            runValidators: true,
            new: true,
        });

        if (!task) {
            return res.status(404).send({
                error: 'Not Found',
                message: `Task with id '${id}' not found`,
            });
        }

        return res.status(200).send(task);
    } catch (error) {
        return next(error);
    }
};

const deleteTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send({
                error: 'Not Found',
                message: `Task with id '${id}' not found`,
            });
        }

        const task = await TaskModel.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).send({
                error: 'Not Found',
                message: `Task with id '${id}' not found`,
            });
        }

        return res.status(200).send(task);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskStatusById,
    deleteTaskById,
};
