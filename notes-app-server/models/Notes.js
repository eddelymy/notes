const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({

})

const NoteModel = mongoose.model("notes", NoteSchema)

//Export model
module.exports = NoteModel