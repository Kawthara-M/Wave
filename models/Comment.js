const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  caption: String,
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  description: {
    type: String,
    default: []
  },
  replies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

});


module.exports = mongoose.model("Comment", commentSchema);