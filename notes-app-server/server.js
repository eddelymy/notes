//Create server
const express = require("express")
const app = express()

// Active CORS pour permettre les requêtes inter-origines (nécessaire pour la communication entre le front-end et le back-end)
const cors = require("cors")
app.use(cors())

//Connect to DB
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://eddelymyamina:xQGxMGQt8x18EXuo@cluster0.yyuvc.mongodb.net/BlocNotesProject")
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

//Import category model
const CategoryModel = require('./models/Categories')

app.get("/categories", async(req,res)=>{
  try {
    const categories = await CategoryModel.find(); 
    console.log("Fetched categories:", categories); 
    res.json(categories);
     // Send the data as JSON response 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
})
app.listen("3009",()=>{
  console.log('Hi')
})