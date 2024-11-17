const express = require("express")
const cors = require("cors")

const {initializeDatabase} = require('./db/db.connection');
const { Movies} = require('./models/movies.model');

const app= express()
app.use(cors())
app.use(express.json())


initializeDatabase();

app.get("/",(req,res)=>{
    res.send("Hello, express!")
})
app.get("/movies",async(req,res)=>{
    try{
    const movies = await Movies.find()
    res.json(movies)
    }catch(error){
        res.status(500).json({error:"Failed to fetch movie"})
    }
})

app.post("/movies",async(req, res)=>{
    console.log(req.body)
    
    try{
        const movies = new Movies(req.body) 
        await movies.save()
        res.status(201).json(movies)

    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
})

app.put("/movies/:id",async(req,res)=>{
    const movieId = req.params.id;
    const updateMovieData = req.body
    try{
        const updatedMovie = await Movies.findByIdAndUpdate(movieId,updateMovieData,{new:true})
        if(!updatedMovie){
            return res.status(404).json({message:"Movie not found"})
        }
        res.status(200).json(updatedMovie)
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})

app.delete("/movies/:id",async(req, res)=>{
    const movieId = req.params.id
    try{
        const deletedMovie = await Movies.findByIdAndDelete(movieId)
        if(!deletedMovie){
            res.status(404).json({message:"Movie not found"})
        }
        res.status(200).json({message:"Movie deleted successfully",Movies:deletedMovie})

    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})



const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})