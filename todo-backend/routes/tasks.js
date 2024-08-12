const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /api/tasks - Retrieve all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/task - Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    assignedTo: req.body.assignedTo,
    status: req.body.status,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    comments: req.body.comments
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/task/:id - Update a task by ID
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (req.body.assignedTo != null) {
      task.assignedTo = req.body.assignedTo;
    }
    if (req.body.status != null) {
      task.status = req.body.status;
    }
    if (req.body.dueDate != null) {
      task.dueDate = req.body.dueDate;
    }
    if (req.body.priority != null) {
      task.priority = req.body.priority;
    }
    if (req.body.comments != null) {
      task.comments = req.body.comments;
    }
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/task/:id - Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
