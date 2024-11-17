const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title:String,
    releaseYear:Number,
    genre:String,
    director:String,
    actors:String,
    country:String,
    rating:{
        type:String,min:0,max:10,default:0
    },
    plot:String,
    awards:String,
    postUrl:String,
    trailerUrl:String
},{timestamps:true})

const Movies = mongoose.model("Movies",movieSchema);
module.exports = {Movies}