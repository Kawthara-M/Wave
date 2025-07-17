const Recipe = require("../models/Recipe.js")
const User = require("../models/User.js")

exports.recipe_create_get = async (req, res) => {
  res.render("./recipes/new.ejs")
}
exports.recipe_create_post = async (req, res) => {
  try {
    const user = await User.findById(req.body.author)
    const recipe = await Recipe.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      author: req.session.user._id,
    })

    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.error("An error has occurred creating a recipe!", error.message)
  }
}

exports.recipe_index_get = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    res.render("./recipes/all.ejs", { recipes })
  } catch (error) {
    console.error("An error has occurred getting all recipes!", error.message)
  }
}

exports.recipe_show_get = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    res.render("./recipes/show.ejs", { user: req.session.user, recipe })
  } catch (error) {
    console.error("An error has occurred getting a recipe!", error.message)
  }
}

exports.recipe_edit_get = async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  res.render("./recipes/edit.ejs", { recipe })
}
exports.recipe_update_put = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    )
    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.error("An error has occurred updating a recipe!", error.message)
  }
}
exports.recipe_delete_delete = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId)
    res.render("./recipes/confirm.ejs")
  } catch (error) {
    console.error("An error has occurred deleting a recipe!", error.message)
  }
}
