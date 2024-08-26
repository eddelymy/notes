const {Schema,model} = require("mongoose")

const CategorySchema = new Schema({
  category:{
    type:String,
  },
  label:{
    type:Array,
  }
})

const CategoryModel = model("categories", CategorySchema)

//Export model
module.exports = CategoryModel