const User = require("../models/User.js")
const Post = require("../models/Post.js")

exports.user_show_get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const posts = await Post.find({ user: user._id })

    console.log(user)
    const userData = {
      _id: user._id,
      username: user.username,
      picture: user.profileImage,
      birthday:user.birthday,
      bio:user.bio,
      posts: posts,
    }

    res.render("./users/profile.ejs", { userData })
  } catch (error) {
    console.error("An error has occurred rendering a profile!", error.message)
  }
}

exports.user_edit_get = async (req, res) => {
  try {
    res.render("./users/edit.ejs", { data })
  } catch (error) {
    console.error("An error has occurred rendering a profile!", error.message)
  }
}

exports.user_update_put = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    const post = currentUser.posts.id(req.params.postId)

    post.set(req.body)

    await currentUser.save()

    res.redirect(`/users/profile.ejs`)
  } catch (error) {
    console.error("An error has occurred rendering a profile!", error.message)
  }
}
