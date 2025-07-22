const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
    default: "",
  },
  replies: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
}],
  user: { type: mongoose.Schema.Types.ObjectId,
     ref: "User" }
})

module.exports = mongoose.model("Comment", commentSchema)
