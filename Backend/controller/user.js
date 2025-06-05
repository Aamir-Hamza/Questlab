const usermodel  = require("../models/user")
async function Postdata(req, res) {
    try {
      const { firstname, lastname, title, profilephoto } = req.body;
  
      const user = new usermodel({ firstname, lastname, title, profilephoto });
      await user.save();
  
      res.status(201).json(user); 
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }
  
async function getdata(req, res) {
    try {
      const users = await usermodel.find();
      res.json(users); 
    } catch (error) {
      console.error("Error fetching users:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
module.exports = {Postdata,getdata}
