const User = require("../models/User.js")
const validatePassword = require("../validators/passwordValidator.js")
const passValidator = require("../validators/passwordValidator.js")
const bcrypt = require("bcrypt")

exports.auth_signup_get = async (req, res) => {
  try {
    //render signup page
  } catch (error) {
    console.error("An error has occurred signing up a user!", error.message)
  }
}
exports.auth_signup_post = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (userInDatabase) {
      return res.send("Username already taken!") //should be shown near username field
    }
    if (!validatePassword(req.body.password)) {
      return res.send("Weak Password! please follow -x- password policy:") // x replaced with project name
    }

    if (req.body.password !== req.body.ConfirmPassword) {
      return res.send("Password and confirm password must match...")
    }

    //password encryption -- useing bcrypt
    const hashedPassword = bcrypt.hashSync(req.body.password, 10) //max rounds is 15
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    res.send(`Thanks for signing up, ${user.username}`)
  } catch (error) {
    console.error("An error has occurred signing up a user!", error.message)
  }
}

exports.auth_signin_get = async (req, res) => {
  try {
    //render signin page
  } catch (error) {
    console.error("An error has occurred signing in a user!", error.message)
  }
}
exports.auth_signin_post = async (req, res) => {
  try {
    //if username or password aren't correct, "Username or Password arent correct"
    //direct user to home page
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
  try {
    // Show page for updating user password
  } catch (error) {
    console.error(
      "An error has occurred while directing user to update password form!",
      error.message
    )
  }
}

exports.pass_update_put = async (req, res) => {
  try {
    //ask for user old password, if correct continue, else show "incorrect password
    //if new password meets critera continue, else show msg of password policy
    // if new password and confirm password dont match, show msg
    // otherwise, update password in DB
  } catch (error) {
    console.error(
      "An error has occurred updating a user's password!",
      error.message
    )
  }
}
