//Create server
const express = require("express")
const app = express()
const _PORT = process.env.PORT

// Active CORS pour permettre les requêtes inter-origines (nécessaire pour la communication entre le front-end et le back-end)
const cors = require("cors")
app.use(cors()) 
app.use(express.json())


//Connect to DB
const username = process.env.USERNAME, 
      password = process.env.PASSWORD,
      bd = process.env.DB
const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.yyuvc.mongodb.net/${bd}`)
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB")
})
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
})

//Import routes

const categoryRoutes = require('./routes/categoryRoutes')
app.use('/',categoryRoutes)

//Import category model
// const CategoryModel = require('./models/Categories')

// app.get("/categories", async(req,res)=>{
//     const categories = await CategoryModel.find(); 
//     res.json(categories);
  
// })

// app.post("/category/new", async(req,res)=>{
//   const newCategory = new CategoryModel(req.body)
//   await newCategory.save()
//   res.json(req.body)
  
// })
app.listen(_PORT,()=>{
  console.log('server works !')
})