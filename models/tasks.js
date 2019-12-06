const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  complete: Boolean
});

const Task = mongoose.model('Task', taskSchema);