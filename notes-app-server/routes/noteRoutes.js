const express = require('express')
const router = express.Router()
const { validateCreateNote } = require('../middlewares/note/validateCreateNote')
const noteController = require('../controllers/noteController')

router.post('/note/new', validateCreateNote, noteController.createNote)


module.exports = router
