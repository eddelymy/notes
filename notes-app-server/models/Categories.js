const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
  category:{
    type:String,
  },
  label:{
    type:Array,
  }
})

const CategoryModel = mongoose.model("categories", CategorySchema)

//Export model
module.exports = CategoryModel