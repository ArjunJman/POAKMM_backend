const { MatchModel, TicketModel } = require('../models/Models')

//Booked Tickets
const CreateTicket = async (req, res) => {
    try {
        const Tickets = req.body.allTickets;
        let bookedSeats = [];
        let matchId;

        for (const ticket of Tickets) {
            var newTicket = ticket;
            matchId = newTicket.match_id;
            bookedSeats.push(newTicket.seat_no);
            newTicket.id = Math.flooer(Math.random())
            newTicket.email = req.user.email
            const obj = new TicketModel(newTicket);
            await obj.save();
        }

        // update the book tickets in match collection
        let matchData = await MatchModel.findOne({ 'match_id': matchId });
        const allSeats = JSON.parse(JSON.stringify(matchData['seats']));

        bookedSeats.forEach((seat) => {
            allSeats[seat] = false;
        });

        matchData.seats = allSeats;
        await matchData.save();

        res.send({ message: "Tickets Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    CreateTicket
}