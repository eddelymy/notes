const NoteModel = require('../models/Notes')

exports.pagination = async (req, res) => {
  const { page = 1, limit = 10, search = {} } = req.query;
  const skip = (page - 1) * limit;
  // const sortOrder = order === 'desc' ? -1 : 1;

  // Convertir `search` en objet si ce n'est pas déjà le cas
  const searchObject = typeof search === 'object' ? search : {};

  // Créer un objet de requête
  let query = {};

  // Ajouter une condition de recherche si `key` et `value` sont présents dans `searchObject`
  if (searchObject.key && searchObject.value) {
    query[searchObject.key] = { $regex: searchObject.value, $options: 'i' };
  }

  try {
    const notes = await NoteModel.find(query)
      .skip(skip)
      .limit(Number(limit))

    const totalNotes = await NoteModel.countDocuments(query);

    res.json({
      total: totalNotes,
      pages: Math.ceil(totalNotes / limit),
      notes,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des notes' });
  }
};
exports.createNote = async (req, res) => {
  const newNote= new NoteModel(req.body)
  try {
    await newNote.save()
    res.status(200).json({ message: 'Note créée avec succès', note: newNote })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erreur lors de la création de la Note' })
  }
}