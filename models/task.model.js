/**
 * @module TaskModel
 * @description Task Model
 * @author Nikzzy
 */
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        minlength: 1,
        maxlength: 20,
        required: true,
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 200,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['New', 'In-Progress', 'Completed'],
        default: 'New',
    },
}, {
    timestamps: true,
    collection: 'TaskMaster',
});

const TaskModel = mongoose.model('TaskMaster', taskSchema);

module.exports = TaskModel;
