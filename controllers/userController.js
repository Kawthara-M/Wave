const User = require("../models/User.js")
const Recipe = require("../models/Recipe.js")

exports.user_show_get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const recipes = await Recipe.find({ author: user._id })

    const data = {
      _id: user._id,
      first: user.first,
      last: user.last,
      picture: user.picture,
      recipes: recipes,
    }
    res.render('./users/profile.ejs', { data })
  } catch (error) {
    console.error("An error has occurred finding a user!", error.message)
  }
}
