const CategoryModel = require('../models/Categories')

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des categories' })
  }
}

exports.createCategory = async (req, res) => {
  const newCategory = new CategoryModel(req.body)
  try {
    await newCategory.save()
    res.status(200).json({ message: 'Catégorie créée avec succès', category: newCategory })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erreur lors de la création de la categorie' })
  }
}

exports.deleteCategory = async(req, res) => {
  try {
    const categoryId = req.params.id
    await CategoryModel.findByIdAndDelete(categoryId)

    res.status(200).json({ message: 'Catégorie supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie' })
  }
}

