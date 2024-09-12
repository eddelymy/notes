const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.signUp)
router.post('/login', userController.login)
router.post('/reset-password', userController.sendResetPasswordEmail)


module.exports = router
