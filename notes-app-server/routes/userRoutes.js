const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.signUp)
router.post('/login', userController.login)
router.post('/reset-password', userController.sendResetPasswordEmail)
router.put('/edit-password/:id', userController.updatePassword)
router.put('/edit-mail/:id', userController.updateEmail)
router.put('/edit-username/:id', userController.updateUsername)


module.exports = router
