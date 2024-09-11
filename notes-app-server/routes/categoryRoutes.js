const express = require('express')
const router = express.Router()
const { validateCreateCategory } = require('../middlewares/category/validateCreateCategory')
const { validateEditCategory } = require('../middlewares/category/validateEditCategory')
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middlewares/user/authMiddleware')

router.get('/all/categories', authMiddleware,categoryController.getAllCategories)
router.post('/category/new',authMiddleware, validateCreateCategory, categoryController.createCategory)
router.delete('/category/:id',authMiddleware, categoryController.deleteCategory)
router.put('/category/:id',authMiddleware, validateEditCategory, categoryController.editCategory)
router.get('/categories',authMiddleware,categoryController.pagination)


module.exports = router
