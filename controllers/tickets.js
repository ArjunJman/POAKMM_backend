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
        const booked_seats = []
        var match_id;

        for (ticket in Tickets['allTickets']){
            const NewTick = Tickets['allTickets'][ticket]
            console.log(NewTick)
            booked_seats.push(NewTick['seat_no'])
            match_id = NewTick['match_id']
            const obj = new TicketModel(NewTick)
            //await obj.save()
        }
        console.log(booked_seats)

        const Match = await MatchModel.findOne({'match_id':match_id})
        console.log(Match)
        var seats_in_match = JSON.parse(JSON.stringify(Match['seats']))

        booked_seats.forEach((seat) => {
            seats_in_match[seat] = false;
        })

        console.log(seats_in_match)
        Match.seats = seats_in_match
        await Match.save()
        res.send("Tickets Added Successfully")
    } catch(e)
    {
        console.log(e)
     res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    CreateTicket
}