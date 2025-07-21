const User = require("../models/User.js")
const Post = require("../models/Post.js")

exports.user_show_get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const posts = await Post.find({ user: user._id })

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
      const currentUser = await User.findById(req.params.id)
    res.render(`./users/edit.ejs`, currentUser)
  } catch (error) {
    console.error("An error has occurred rendering a profile!", error.message)
  }
}

exports.user_update_put = async (req, res) => {
  try {
    const currentUser = await User.findByIdAndUpdate(req.session.user._id,req.body,req.file.profileImage)
     const user = await User.findById(req.session.user._id)
    const posts = await Post.find({ user: user._id })

    const userData = {
      _id: user._id,
      username: user.username,
      picture: user.profileImage,
      birthday:user.birthday,
      bio:user.bio,
      posts: posts,
    }

    //currentUser.set(req.body)

    await currentUser.save()

   res.render(`./users/profile.ejs`,{userData})
  } catch (error) {
    console.error("An error has occurred rendering a profile!", error.message)
  }
}
