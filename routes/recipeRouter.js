const router = require("express").Router()
const recipeCtrl = require("../controllers/recipeController.js")

// Recipe routes

router.get("/new", recipeCtrl.recipe_create_get)
router.post("/", recipeCtrl.recipe_create_post)
router.get("/", recipeCtrl.recipe_index_get)
router.get("/:recipeId", recipeCtrl.recipe_show_get)
router.get("/:recipeId/edit", recipeCtrl.recipe_edit_get)
router.put("/:recipeId", recipeCtrl.recipe_update_put)
router.delete("/:recipeId", recipeCtrl.recipe_delete_delete)
module.exports = router
