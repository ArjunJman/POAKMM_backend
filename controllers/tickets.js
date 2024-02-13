const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { UserModel,MatchModel,TicketModel }  = require('../models/Models')

const mongoose = require('mongoose')
const conn_str = "mongodb+srv://aiarjun027:arjun1234@cluster0.beh4ixw.mongodb.net/POAKMM?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(()=> console.log("Connected Successsfully")).catch((err)=> console.log(err))

const CreateTicket = async (req,res) => {
    try{
        const Tickets = req.body
        console.log(Tickets)
        for (ticket in Tickets['allTickets']){
            const NewTick = Tickets['allTickets'][ticket]
            console.log(NewTick)
            const obj = new TicketModel(NewTick)
            const result = await obj.save()
        }
        res.send("Tickets Added Successfully")
    } catch(e)
    {
     res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    CreateTicket
}