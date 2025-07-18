const User = require("../models/User.js")
const bcrypt = require("bcrypt")

exports.auth_signup_get = async (req, res) => {
  try {
    //username taken, show little message "enter another name"
    // if password not valid, "enter another password"
    //if password and confirm password doesn't macth, tell them
    //If everything is fine, direct user to login page
  } catch (error) {
    console.error("An error has occurred signing up a user!", error.message)
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
