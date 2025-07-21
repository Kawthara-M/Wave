const router = require('express').Router();

const userController = require('../controllers/userController.js')

router.get('/:id', userController.user_show_get);
router.get('/:id/edit', userController.user_edit_get);
router.put('/:id', userController.user_update_put);

module.exports = router