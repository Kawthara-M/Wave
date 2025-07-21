const router = require('express').Router();

const userController = require('../controllers/userController.js')

router.get('/:id', userController.user_show_get);

module.exports = router