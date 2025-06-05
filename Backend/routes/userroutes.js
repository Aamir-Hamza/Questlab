const express = require("express");       
const router = express.Router(); 
const usercontoller  = require("../controller/user")
router.post("/register",usercontoller.Register) 
router.get("/getdata",usercontoller.getdata)        
module.exports = router