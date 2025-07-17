const User = require("../models/User.js")
const bcrypt = require("bcrypt")

// auth APIs
// I wans't sure which naming convention I should use, so I just followed the way Mr. Saad explained

exports.auth_signup_get = async (req, res) => {
  res.render("./auth/sign-up.ejs")
}

exports.auth_signup_post = async (req, res) => {
  try {
    const userInDatabase = await User.exists({ email: req.body.email }) //or use findOne
    if (userInDatabase) {
      return res.send("Username already taken!")
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match")
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)

    await User.create({
      email: req.body.email,
      password: hashedPassword,
      first: req.body.first,
      last: req.body.last,
      picture: req.body.picture,
    })
    res.render("./auth/thanks.ejs")
  } catch (error) {
    console.error("An error has occurred registering a user!", error.message)
  }
}
exports.auth_signin_get = async (req, res) => {
  res.render("./auth/sign-in.ejs")
}

exports.auth_signin_post = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.send(
        "No user has been registered with that email. Please sign up!"
      )
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password)
    if (!validPassword) {
      return res.send("Incorrect password! Please try again.")
    }

    req.session.user = {
      email: user.email,
      _id: user._id,
    }
    res.redirect(`/users/${user._id}`)
  } catch (error) {
    console.error("An error has occurred signing in a user!", error.message)
  }
}

exports.auth_signout_get = async (req, res) => {
  try {
    req.session.destroy()
    res.redirect("/")
  } catch (error) {
    console.error("An error has occurred signing out a user!", error.message)
  }
}

exports.pass_edit_get = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.render("./auth/update-password.ejs", { user })
}

exports.pass_update_put = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.send("No user with that ID exists!")
    }

    const validPassword = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    )
    if (!validPassword) {
      return res.send("Your old password was not correct! Please try again.")
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match")
    }

    const hashedPassword = bcrypt.hashSync(req.body.newPassword, 12)
    user.password = hashedPassword
    await user.save()

    res.render("./auth/confirm.ejs", { user })
  } catch (error) {
    console.error(
      "An error has occurred updating a user's password!",
      error.message
    )
  }
}
