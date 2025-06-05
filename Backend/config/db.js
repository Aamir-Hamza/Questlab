const mongoose = require("mongoose");
require("dotenv").config()
const dbconnecction= ()=>{
    try {
        mongoose.connect(process.env.dburl)
        console.log("connected to database")    
    } catch (error) {
        console.log("error connecting to database")
        
    }
}
module.exports = dbconnecction