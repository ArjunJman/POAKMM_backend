const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { UserModel,MatchModel,TicketModel }  = require('../models/Models')

const mongoose = require('mongoose')
const conn_str = "mongodb+srv://aiarjun027:arjun1234@cluster0.beh4ixw.mongodb.net/POAKMM?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(()=> console.log("Connected Successsfully")).catch((err)=> console.log(err))

const CreateTicket = (req,res) => {
    try{
        const Tickets = req.body

        for (ticket in Tickets){
            const NewTick = Tickets[ticket]
            console.log(NewTick)
        }
    } catch(e)
    {
     res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    CreateTicket
}