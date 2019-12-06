const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: String,
  todos: [Schema.Types.ObjectId]
});

const List = mongoose.model('List', listSchema);