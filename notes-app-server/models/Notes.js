const {Schema,model} = require("mongoose")

const noteSchema = new Schema({
  category:{
    type:Object,
  },
  label:{
    type:Array,
  },
  title:{
    type:String,
  },
  content:{
    type:String,
  }
})

const NoteModel = model("notes", noteSchema)

module.exports = NoteModel