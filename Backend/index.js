const express = require("express")
const app = express()
require("dotenv").config()
var cors = require('cors')
app.use(cors())
const dbconnectioned = require("./config/db")
const routesd = require("./routes/userroutes")
app.use(express.json())
PORT  = process.env.PORT|| 8000
//db connection
dbconnectioned()
//api mount
app.use("/api/users", routesd)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})