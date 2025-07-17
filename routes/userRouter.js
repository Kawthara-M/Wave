const router = require("express").Router()
const userCtrl = require("../controllers/userController")

// User Routes

router.get("/:id", userCtrl.user_show_get)

module.exports = router
