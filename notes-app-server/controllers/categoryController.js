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

// exports.editCategory = async (req, res) => {
//   try {
//     const categoryId = req.params.id
//     const updatedData = req.body

//     const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, {
//       category: updatedData.category,
//       label: updatedData.label
//     }, { new: true })

//     res.status(200).json({ message: 'Catégorie modifiée avec succès', category: updatedCategory })
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de la modification de la catégorie' })
//   }
// };
exports.editCategory = async (req, res) => {
  const categoryId = req.params.id
  const updatedData = req.body

  try {
    const existingCategory = await CategoryModel.findById(categoryId)
    if (!existingCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée' })
    }

    existingCategory.category = updatedData.category
    existingCategory.label = updatedData.label

    await existingCategory.save()

    res.status(200).json({ message: 'Catégorie mise à jour avec succès', category: existingCategory })
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie' })
  }
}



