const { MatchModel,TicketModel }  = require('../models/Models')

const mongoose = require('mongoose')
const conn_str = "mongodb+srv://aiarjun027:arjun1234@cluster0.beh4ixw.mongodb.net/POAKMM?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(()=> console.log("Connected Successsfully")).catch((err)=> console.log(err))


//Booked Tickets
const CreateTicket = async (req, res) => {
    try {
        const Tickets = req.body.allTickets;
        console.log(Tickets);

        let bookedSeats = [];
        let matchId;

        for (const ticket of Tickets) {
            const newTicket = ticket;
            matchId = newTicket.match_id;
            bookedSeats.push(newTicket.seat_no);
            console.log(newTicket);
            const obj = new TicketModel(newTicket);
            // const result = await obj.save();
        }
// update the book tickets in match collection
        let matchData = await MatchModel.findOne({ 'match_id': matchId });
        console.log(bookedSeats);

        const allSeats = JSON.parse(JSON.stringify(matchData['seats']));
        console.log(allSeats)

        bookedSeats.forEach((seat) => {
            allSeats[seat] = false;
        });

        matchData.seats = allSeats;
        await matchData.save();

        console.log(matchData);
        res.send({message:"Tickets Added Successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    CreateTicket
}