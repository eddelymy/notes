const { checkSchema, validationResult } = require('express-validator');
const CategoryModel = require('../models/Categories');
exports.validateEditCategory = [
  checkSchema({
    category: {
      exists: {
        errorMessage: 'La catégorie est requise',
      },
      isEmpty: {
        negated: true,
        errorMessage: 'La catégorie ne doit pas être vide',
      },
      custom: {
        options: async (value, { req }) => {
          const categoryId = req.params.id
          const existingCategory = await CategoryModel.findOne({ category: value, _id: { $ne: categoryId } })
          if (existingCategory) {
            throw new Error('Cette catégorie existe déjà')
          }
          return true
        },
      },
    },
    label: {
      isArray: {
        errorMessage: 'L\'étiquette doit être un tableau',
      },
      custom: {
        options: async (value, { req }) => {
          const categoryId = req.params.id
          if (value.length === 0) {
            throw new Error('L\'étiquette doit contenir au moins un élément')
          }
          const existingLabels = await CategoryModel.find({ label: { $in: value }, _id: { $ne: categoryId } })
          if (existingLabels.length > 0) {
            throw new Error('Un ou plusieurs éléments de l\'étiquette existent déjà dans la base de données')
          }
          return true
        },
      },
    },
  }),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('Erreurs de validation:', errors.array())
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]
