const express = require("express");
const router = express.Router();

// Task Model
const Task = require('../models/task.model');

// GET all task
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// ADD a new task
router.post('/', async (req, res) => {
    const {title, description} = req.body;
    const newTask  = new Task({title, description});
    await newTask.save();
    res.json({Status: 'Task saved', task:newTask});
});

// UPDATE a task
router.put('/:id', async (req, res) => {
    const {title, description} = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    const updatedTask = await Task.findById(req.params.id);
    res.json({Status: 'Task updated', task: updatedTask});
});

// DELETE a task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({Status: 'Task deleted'});
});

module.exports = router;