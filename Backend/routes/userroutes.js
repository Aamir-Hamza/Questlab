const express = require("express");       
const router = express.Router(); 
const usercontoller  = require("../controller/user")
router.post("/register",usercontoller.Postdata) 
router.get("/getdata",usercontoller.getdata)        
module.exports = router