const express = require('express')
const router = express.Router()
const { validateCreateNote } = require('../middlewares/note/validateCreateNote')
const noteController = require('../controllers/noteController')

router.get('/notes',noteController.pagination)
router.get('/id/:id', noteController.getNoteById)
router.get('/recentNotes', noteController.getRecentNotes)
router.get('/toDoTasks', noteController.getToDoTasks)
router.delete('/note/:id', noteController.deleteNote)
router.post('/note/new', validateCreateNote, noteController.createNote)
router.put('/note/:id', validateCreateNote, noteController.editNote)
router.get('/category/occurrence',noteController.getCategoryOccurrences)


module.exports = router
