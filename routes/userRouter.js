const router = require("express").Router()

const userCtrl = require("../controllers/userController.js")

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
router.get("/:id/edit", upload.single("profileImage"), userController.user_edit_get)

router.put(
  "/:id",
  upload.single("profileImage"),
  userCtrl.user_update_put
)
router.delete("/:userId", userCtrl.user_delete_delete)
router.post("/search", userCtrl.user_search_post)


// router.put(
//   "/:id",
//   upload.single("profileImage"),
//   userController.user_update_put
// )


module.exports = router
