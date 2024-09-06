const NoteModel = require('../models/Notes')

exports.pagination = async (req, res) => {
  const { page = 1, limit = 10, search = {} } = req.query;
  const skip = (page - 1) * limit;

  const searchObject = typeof search === 'object' ? search : JSON.parse(search);

  let query = {};

  if (searchObject.key && searchObject.value) {
    switch(searchObject.key) {
      case 'category':
        query[searchObject.key] = {
          value: searchObject.value.value,
          label: searchObject.value.label
        }
        break
      case 'label':
        query[searchObject.key] = {
          $elemMatch: {
            value: { $regex: searchObject.value.value, $options: 'i' },
            label: {$regex:searchObject.value.label,$options: 'i'}
          }
        };
        break
      default:
        query[searchObject.key] = { $regex: searchObject.value, $options: 'i' };
    }
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
};
exports.deleteNote = async(req, res) => {
  try {
    const noteId = req.params.id
    await NoteModel.findByIdAndDelete(noteId)

    res.status(200).json({ message: 'Note supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la note' })
  }
};
exports.getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id
    console.log(noteId ,'noteId')

    const note = await NoteModel.findById(noteId)

    if (!note) {
      return res.status(404).json({ message: 'Note non trouvée' })
    }

    res.status(200).json(note)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la récupération de la note' })
  }
};

exports.editNote = async (req, res) => {
  const noteId = req.params.id
  const updatedData = req.body

  try {
    const existingNote = await NoteModel.findById(noteId)
    if (!existingNote) {
      return res.status(404).json({ message: 'Note non trouvée' })
    }

    existingNote.category = updatedData.category
    existingNote.label = updatedData.label
    existingNote.title = updatedData.title
    existingNote.content = updatedData.content

    await existingNote.save()

    res.status(200).json({ message: 'Note mise à jour avec succès', note: existingNote })
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la note' })
  }
}
