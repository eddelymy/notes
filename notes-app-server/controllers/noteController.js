const NoteModel = require('../models/Notes')

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