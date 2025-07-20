const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  caption: String,
  like: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  },
  picture: {type: String},
  description: {type: String}
})


module.exports = mongoose.model("Post", postSchema);