const express = require('express')
const router = express.Router()
const { validateCreateNote } = require('../middlewares/note/validateCreateNote')
const noteController = require('../controllers/noteController')
const authMiddleware = require('../middlewares/user/authMiddleware')

// router.use(authMiddleware)
router.get('/notes',authMiddleware,noteController.pagination)
router.get('/id/:id', authMiddleware,noteController.getNoteById)
router.get('/recentNotes', authMiddleware,noteController.getRecentNotes)
router.get('/toDoTasks', authMiddleware,noteController.getToDoTasks)
router.delete('/note/:id',authMiddleware, noteController.deleteNote)
router.post('/note/new',authMiddleware, validateCreateNote, noteController.createNote)
router.put('/note/:id',authMiddleware, validateCreateNote, noteController.editNote)
router.get('/category/occurrence',authMiddleware,noteController.getCategoryOccurrences)


module.exports = router
