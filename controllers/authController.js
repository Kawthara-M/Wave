const User = require("../models/User.js")
const validatePassword = require("../validators/passwordValidator.js")
const passValidator = require("../validators/passwordValidator.js")
const validator = require("validator")
const bcrypt = require("bcrypt")

exports.auth_signup_get = async (req, res) => {
  try {
    res.render("./auth/sign-up.ejs")
  } catch (error) {
    console.error("An error has occurred signing up a user!", error.message)
  }
}
exports.auth_signup_post = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    const today = new Date()
    const birthday = new Date(req.body.birthday)

    if (today.getFullYear() - birthday.getFullYear() < 18) {
      return res.send("X platform is for ages of 18 and more!")
    }
    if (userInDatabase) {
      return res.send("Username already taken!") //should be shown near username field
    }
    if (!validator.isEmail(req.body.email)) {
      return res.send("Invalid email!") //should be shown near email field
    }
    if (!validatePassword(req.body.password)) {
      return res.send("Weak Password! please follow -x- password policy:") // x replaced with project name
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and confirm password must match...")
    }
    if (req.body.password == req.body.username) {
      return res.send(
        "Username and Password shouldn't be the same! That's not safe."
      )
    }
    // let profileImagePath = null
    // if (req.file) {
    //   profileImagePath =
    //   `/uploads/${req.file.filename}`

    //    profileImagePath +='.png'

    // }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      birthday: req.body.birthday,
      profileImage: req.file.filename,
    })
    res.render("./auth/sign-in.ejs")
  } catch (error) {
    console.error("An error has occurred signing up a user!", error.message)
  }
}

exports.auth_signin_get = async (req, res) => {
  try {
    res.render("./auth/sign-in.ejs")
  } catch (error) {
    console.error("An error has occurred signing in a user!", error.message)
  }
}
exports.auth_signin_post = async (req, res) => {
  try {
    const userInDB = await User.findOne({ username: req.body.username })

    if (!userInDB) {
      return res.send("Login failed, try again, user dont exist")
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDB.password
    )

    // If password is incorrect
    if (!validPassword) {
      return res.send("Login failed, try again")
    }

    req.session.user = {
      username: userInDB.username,
      _id: userInDB._id,
    }
    res.redirect(`../users/${req.session.user._id}`)
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
    res.render("./auth/update-password.ejs", { userInDB })
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

    if (!userInDB) {
      return res.send("No user with that ID exists!")
    }

    const validPassword = bcrypt.compareSync(
      req.body.oldPassword,
      userInDB.password
    )
    if (!validPassword) {
      return res.send("Your old password is not correct! Please try again.")
    }

    if (!validatePassword(req.body.newPassword)) {
      return res.send("Weak Password! please follow -x- password policy:") // x replaced with project name
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match!")
    }

    const hashedPassword = bcrypt.hashSync(req.body.newPassword, 12)
    userInDB.password = hashedPassword
    await userInDB.save()

    res.render("./users/profile.ejs", { userInDB })
  } catch (error) {
    console.error(
      "An error has occurred updating a user's password!",
      error.message
    )
  }
}
