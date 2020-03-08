/**
 * @module TaskController
 * @description Task Controller
 * @author Nikzzy
 */
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

module.exports = {
    createTask,
};
