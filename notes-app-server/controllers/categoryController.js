const CategoryModel = require('../models/Categories')

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des categories' })
  }
}

exports.pagination = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'category', order = 'asc', search = {} } = req.query;
  const skip = (page - 1) * limit;
  const sortOrder = order === 'desc' ? -1 : 1;

  // Convertir `search` en objet si ce n'est pas déjà le cas
  const searchObject = typeof search === 'object' ? search : {};

  // Créer un objet de requête
  let query = {};

  // Ajouter une condition de recherche si `key` et `value` sont présents dans `searchObject`
  if (searchObject.key && searchObject.value) {
    query[searchObject.key] = { $regex: searchObject.value, $options: 'i' };
  }

  try {
    const categories = await CategoryModel.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder });

    const totalCategories = await CategoryModel.countDocuments(query);

    res.json({
      total: totalCategories,
      pages: Math.ceil(totalCategories / limit),
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
  }
};




exports.createCategory = async (req, res) => {
  const newCategory = new CategoryModel(req.body)
  try {
    await newCategory.save()
    res.status(200).json({ message: 'Catégorie créée avec succès', category: newCategory })
  } catch (error) {
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



