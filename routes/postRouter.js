const router = require("express").Router()
const postCtrl = require("../controllers/postController")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

router.get("/new", postCtrl.post_create_get)
router.post("/", upload.single("picture"),postCtrl.post_create_post)

router.get("/", postCtrl.post_index_get)
router.get("/:postId", postCtrl.post_show_get)

router.get("/:postId/edit", postCtrl.post_edit_get)
router.put("/:postId", postCtrl.post_update_put)

/*router.delete("/:postId", postCtrl.post_delete_delete)*/

module.exports = router
