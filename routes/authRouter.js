const router = require("express").Router()
const authrCtrl = require("../controllers/authController")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

router.get("/sign-up", authrCtrl.auth_signup_get)
router.post("/sign-up", upload.single("profileImage"), authrCtrl.auth_signup_post)

router.get("/sign-in", authrCtrl.auth_signin_get)
router.post("/sign-in", authrCtrl.auth_signin_post)

router.get("/sign-out", authrCtrl.auth_signout_get)

router.get("/update-password", authrCtrl.pass_edit_get)
router.put("/update-password", authrCtrl.pass_update_put)

module.exports = router
