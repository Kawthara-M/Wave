
const User = require("../models/User.js")
const Post = require("../models/Post.js")
const Comment= require('../models/Comment.js')

exports.post_create_get = async (req, res) => {
  try {
    res.render('posts/new.ejs')
  } catch (error) {
    console.error('An error has occurred while directing user!', error.message)
  }
}

exports.post_create_post = async (req, res) => {
  try {
    const user = await User.findById(req.session.user)

    const post = await Post.create({
      description: req.body.description,
      picture: req.file.filename,
      user: user._id
    })

    res.redirect(`/posts/${post._id}`)
  } catch (error) {
    console.error('An error has occurred creating a post!', error.message)
  }
}

exports.post_index_get = async (req, res) => {
  try {
const posts = await Post.find().populate("user")    
    res.render("posts/index.ejs", {posts})
  } catch (error) {
    console.error('An error has occurred while viewing posts!', error.message)
  }
}

exports.post_show_get = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)

    
    const comments= await Comment.find({ post: req.params.postId})
    res.render("./posts/show.ejs", { user: req.session.user, post, comments})

  } catch (error) {
    console.error(
      `An error has occurred while showing ${req.params.postId} post`,
      error.message
    )
  }
}

exports.post_edit_get = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.render('./posts/edit.ejs', { post })
  } catch (error) {
    console.error(
      'An error has occurred while directing to edit view!',
      error.message
    )
  }
}

exports.post_update_put = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.postId, req.body)
    res.redirect(`/posts/${post._id}`)
  } catch (error) {
    console.error('An error has occurred updating a post!', error.message)
  }
}
exports.post_delete_delete = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId)
    res.redirect(`/users/${req.session.user._id}`)
  } catch (error) {
    console.error('An error has occurred deleting a post!', error.message)
  }
}


exports.comment_create_post= async(req,res)=> {
  try {

    const post=await User.findById(req.params.postId)
    const comment = await Comment.create({
      post: req.params.postId,
      description: req.body.comment,
    })
    console.log(comment)
    res.redirect(`/post/${req.params.postId}`)
  } catch (error) {
    console.error("An error has occurred creating a comment!", error.message)
  }
}


exports.likes_create_post = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { favorited: req.params.userId }
    })
    res.redirect(`/posts/${req.params.postId}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

