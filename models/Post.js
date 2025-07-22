const mongoose = require('mongoose');
const { applyTimestamps } = require('./User');

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
  favorited:{
    type: Array,
    default: []
  },

  date: {
    type: Date,
    default: Date.now
  },
  picture: {type: String},
  description: {type: String}
}, {timestamps:true})


module.exports = mongoose.model("Post", postSchema);