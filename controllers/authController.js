const User = require("../models/User.js")
const validatePassword = require("../validators/passwordValidator.js")
const passValidator = require("../validators/passwordValidator.js")
const validator = require("validator")
const bcrypt = require("bcrypt")

exports.auth_signup_get = async (req, res) => {
  try {
    res.render("./auth/sign-up.ejs", { errors: null })
  } catch (error) {
    console.error("An error has occurred signing up a user!", error.message)
  }
}
exports.auth_signup_post = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    const today = new Date()
    const birthday = new Date(req.body.birthday)
    let errors = []

    if (today.getFullYear() - birthday.getFullYear() < 18) {
      errors.push("Wave platform is for ages over 18! See you later")
    }
    if (userInDatabase) {
      errors.push("Username already taken")
    }
    if (!validator.isEmail(req.body.email)) {
      errors.push("Invalid email")
    }
    if (!validatePassword(req.body.password)) {
      errors.push(
        "Weak Password! Have a mix of capital and lower letters, digits, and unique symbols"
      )
    }

    if (req.body.password !== req.body.confirmPassword) {
      errors.push(
        "Username and Password shouldn't be the same! That's not safe."
      )
    }
    if (req.body.password == req.body.username) {
      errors.push(
        "Username and Password shouldn't be the same! That's not safe."
      )
    }
    if (errors.length > 0) {
      return res.render("./auth/sign-up.ejs", { errors })
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      birthday: req.body.birthday,
      profileImage: req.file.filename,
    })
    res.render("./auth/sign-in.ejs", { error: null })
  } catch (error) {
    console.error("An error has occurred signing up a user!", error.message)
  }
}

exports.auth_signin_get = async (req, res) => {
  try {
    res.render("./auth/sign-in.ejs", { error: null })
  } catch (error) {
    console.error("An error has occurred signing in a user!", error.message)
  }
}
exports.auth_signin_post = async (req, res) => {
  try {
    const userInDB = await User.findOne({ username: req.body.username })
    let error = ""

    if (!userInDB) {
      error = "Login failed, try again!"
      res.render("./auth/sign-in.ejs", { error })
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDB.password
    )

    // If password is incorrect
    if (!validPassword) {
      error = "Login failed, try again"
      res.render("./auth/sign-in.ejs", { error })
    } else {
      req.session.user = {
        username: userInDB.username,
        _id: userInDB._id,
      }
      res.redirect(`../users/${req.session.user._id}`)
    }
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
    const userInDB = await User.findById(req.params.id)
    res.render(`auth/update-password.ejs`, { user: userInDB, errors: null })
  } catch (error) {
    console.error(
      "An error has occurred while directing user to update password form!",
      error.message
    )
  }
}

exports.pass_update_put = async (req, res) => {
  try {
    const userInDB = await User.findById(req.params.id)

    let errors = []
    if (!userInDB) {
      errors.push("No user with that ID exists!")
    }
    const validPassword = bcrypt.compareSync(
      req.body.oldPassword,
      userInDB.password
    )

    if (!validPassword) {
      errors.push("Your old password is not correct! Please try again.")
    }
    if (!validatePassword(req.body.newPassword)) {
      errors.push(
        "Weak Password! Use a mix of lower & capital letters, digits, and unique character!"
      )
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      errors.push("Password and Confirm Password must match!")
    }

    if (errors.length > 0) {
      res.render(`auth/update-password`, { user: userInDB, errors })
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.newPassword, 12)
      userInDB.password = hashedPassword
      await userInDB.save()

      res.redirect(`/users/${userInDB._id}`)
    }
  } catch (error) {
    console.error(
      "An error has occurred updating a user's password!",
      error.message
    )
  }
}
