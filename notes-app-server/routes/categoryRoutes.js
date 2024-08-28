const express = require('express')
const router = express.Router()
const { validateCategory } = require('../middlewares/validateCategory')
const categoryController = require('../controllers/categoryController')

router.get('/categories', categoryController.getAllCategories)
router.post('/category/new', validateCategory, categoryController.createCategory)
router.delete('/category/:id', categoryController.deleteCategory)


module.exports = router
