const express = require('express')
const router = express.Router()
const { validateCreateNote } = require('../middlewares/note/validateCreateNote')
const noteController = require('../controllers/noteController')

router.get('/notes',noteController.pagination)
// router.get('/all/notes', noteController.getAllNotes)
router.delete('/note/:id', noteController.deleteNote)
router.post('/note/new', validateCreateNote, noteController.createNote)


module.exports = router
