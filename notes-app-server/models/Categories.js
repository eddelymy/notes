const {Schema,model} = require("mongoose")

const categorySchema = new Schema({
  category:{
    type:String,
  },
  label:{
    type:Array,
  }
})

const CategoryModel = model("categories", categorySchema)

//Export model
module.exports = CategoryModel