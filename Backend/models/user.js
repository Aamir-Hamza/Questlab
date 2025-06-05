
const { default: mongoose } = require("mongoose");
const { type } = require("os");
const userSchema = mongoose.Schema({
    "firstname" : {required: true, type : String},
    "lastname" : {required: true, type: String},
    "title" : {required: true ,type: String},
    "profilephoto" : {required: true, type: String}
})

module.exports = mongoose.model("user", userSchema)




