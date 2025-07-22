const mongoose = require('mongoose');
const { applyTimestamps } = require('./User');

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: {
    type: Array,
    default: []
  },
  picture: {type: String},
  description: {type: String}
}, {timestamps:true})


module.exports = mongoose.model("Post", postSchema);