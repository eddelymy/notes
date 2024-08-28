const express = require('express')
const router = express.Router()
const { validateCreateCategory } = require('../middlewares/validateCreateCategory')
const { validateEditCategory } = require('../middlewares/validateEditCategory')
const categoryController = require('../controllers/categoryController')

router.get('/categories', categoryController.getAllCategories)
router.post('/category/new', validateCreateCategory, categoryController.createCategory)
router.delete('/category/:id', categoryController.deleteCategory)
router.put('/category/:id', validateEditCategory, categoryController.editCategory)


module.exports = router
