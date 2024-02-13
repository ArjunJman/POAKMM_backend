const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email:String,
        username:String,
        password:String
    }
)

const MatchSchma = new mongoose.Schema(
    {
        match_id:String,
        name:String,
        category:String,
        date:String,
        location:String,
        venue:String,
        seats:Object,
        img_url:String
    }
)

const ticketSchema = new mongoose.Schema(
    {
        id:String,
        date:String,
        seat_no:Number,
        payment_date:String,
        match_id:String,
        email:String
    }
)

const TicketModel = new mongoose.model("tickets",ticketSchema)
const MatchModel = new mongoose.model("matches",MatchSchma)
const UserModel = new mongoose.model("user_auths",userSchema)

module.exports = {
    UserModel,
    MatchModel,
    TicketModel
  };