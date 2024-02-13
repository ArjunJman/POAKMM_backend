const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email:String,
        username:String,
        password:String
    }
)
const UserModel = new mongoose.model("user_auths",userSchema)

module.exports = {
    UserModel,
  };