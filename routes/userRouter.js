const router = require("express").Router()

const userController = require("../controllers/userController.js")

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

router.get("/:id", userController.user_show_get)
router.get("/:id/edit", userController.user_edit_get)
router.put(
  "/:id",
  upload.single("profileImage"),
  userController.user_update_put
)
router.put(
  "/:id",
  upload.single("profileImage"),
  userController.user_update_put
)
router.post("/search", userController.user_search_post)

module.exports = router
