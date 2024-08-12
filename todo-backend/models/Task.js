const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  assignedTo: { type: String, required: true },
  status: { type: String, enum: ['Completed', 'In Progress', 'Not Started'], required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'High', 'Normal'], required: true },
  comments: { type: String }
});

module.exports = mongoose.model('Task', taskSchema);
