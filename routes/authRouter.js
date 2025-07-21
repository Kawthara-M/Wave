const router = require("express").Router()
const authrCtrl = require("../controllers/authController")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname)
  },
})

const upload = multer({ storage: storage })

router.get("/sign-up", authrCtrl.auth_signup_get)
router.post(
  "/sign-up",
  upload.single("profileImage"),
  authrCtrl.auth_signup_post
)

router.get("/sign-in", authrCtrl.auth_signin_get)
router.post("/sign-in", authrCtrl.auth_signin_post)

router.get("/sign-out", authrCtrl.auth_signout_get)

router.get("/:id/update-password", authrCtrl.pass_edit_get)
router.put("/:id", authrCtrl.pass_update_put)

module.exports = router
