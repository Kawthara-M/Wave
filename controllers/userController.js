const User = require("../models/User.js")
const Post = require("../models/Post.js")
const { format } = require("date-fns")

exports.user_show_get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const posts = await Post.find({ user: user._id })
    const formattedBirthday = user.birthday
      ? format(new Date(user.birthday), "dd/MM/yyyy")
      : null

    const userData = {
      _id: user._id,
      username: user.username,
      picture: user.profileImage,
      birthday: formattedBirthday,
      bio: user.bio,
      posts: posts,
    }

    res.render("./users/profile.ejs", {
      userData,
      loggedInUserId: req.session.user ? req.session.user._id.toString() : null,
    })
  } catch (error) {
    console.error("An error has occurred rendering a profile!", error.message)
  }
}

exports.user_edit_get = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id)
    res.render(`./users/edit.ejs`, { currentUser, error: null })
  } catch (error) {
    console.error("An error has occurred rendering a profile!", error.message)
  }
}

exports.user_update_put = async (req, res) => {
  try {
    let error = "username is already taken"
    const user = await User.findById(req.session.user._id)
    const userInDB = await User.find({ username: req.body.username })
    if (userInDB.length>0) {
      res.render("./users/edit.ejs", { error, currentUser: user })
    } else {
      req.body.profileImage = req.file.filename
      const currentUser = await User.findByIdAndUpdate(
        req.session.user._id,
        req.body
      )
      const posts = await Post.find({ user: user._id })
      const formattedBirthday = user.birthday
        ? format(new Date(user.birthday), "dd/MM/yyyy")
        : null

      const userData = {
        _id: user._id,
        username: user.username,
        picture: user.profileImage,
        birthday: formattedBirthday,
        bio: user.bio,
        posts: posts,
      }

      const loggedInUserId = userData._id

      await currentUser.save()
      res.redirect(`/users/${user._id}`)
    }
  } catch (error) {
    console.error("An error has occurred rendering a profile!", error.message)
  }
}

exports.user_delete_delete = async (req, res) => {
  try {
    console.log("reached")
    const userId = req.params.userId

    await User.findByIdAndDelete(userId)
    req.session.destroy()

    res.redirect("/auth/sign-up")
  } catch (error) {
    console.error("Error deleting user:", error)
    return res
      .status(500)
      .json({ message: "Server error. Unable to delete account." })
  }
}

exports.user_search_post = async (req, res) => {
  try {
    const queryString = req.body.search
    const queryStrings = queryString.split(" ")
    allQueries = []
    queryStrings.forEach((element) => {
      allQueries.push({ username: { $regex: String(element) } })
    })
    const users = await User.find({ $or: allQueries })
    if (!users || users.length === 0)
      res.status(400).send({ error: "No user was found" })

    const firstUser = users[0]
    res.redirect(`/users/${firstUser._id}`)
  } catch (error) {
    console.error("An error has occurred searching a username!", error.message)
  }
}
