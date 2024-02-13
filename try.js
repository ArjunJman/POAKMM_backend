const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const {MatchModel} = require('../models/UserModel')

const mongoose = require('mongoose')
const conn_str = "mongodb+srv://aiarjun027:arjun1234@cluster0.beh4ixw.mongodb.net/POAKMM?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(()=> console.log("Connected Successsfully")).catch((err)=> console.log(err))


const EventData = async () => {
    try {
        // Dummy data
        const dummyMatches = [
            {
                match_id: "1",
                name: "Football Match 1",
                category: "Football",
                date: "2024-02-15",
                location: "Stadium A",
                venue: "Main Field",
                seats: { available: 500, total: 1000 },
                img_url: "https://www.shutterstock.com/image-illustration/american-soccer-stadium-3d-rendering-516354493"
            },
            {
                match_id: "2",
                name: "Football Match 2",
                category: "Football",
                date: "2024-02-20",
                location: "Stadium B",
                venue: "Field 1",
                seats: { available: 400, total: 800 },
                img_url: "https://www.shutterstock.com/image-photo/american-football-players-action-grand-arena-345202907"
            },
            {
                match_id: "3",
                name: "Football Match 3",
                category: "Football",
                date: "2024-02-25",
                location: "Stadium C",
                venue: "Soccer Ground",
                seats: { available: 600, total: 1200 },
                img_url: "https://www.shutterstock.com/image-photo/american-football-game-out-focus-players-114504847"
            },
            {
                match_id: "4",
                name: "Football Match 4",
                category: "Football",
                date: "2024-03-01",
                location: "Stadium D",
                venue: "Field 2",
                seats: { available: 300, total: 600 },
                img_url: "https://www.shutterstock.com/image-photo/soccer-player-action-mixed-media-652647784"
            },
            {
                match_id: "5",
                name: "Football Match 5",
                category: "Football",
                date: "2024-03-05",
                location: "Stadium E",
                venue: "Soccer Arena",
                seats: { available: 700, total: 1400 },
                img_url: "https://www.shutterstock.com/image-photo/football-player-stadium-1051589441"
            },
            {
                match_id: "6",
                name: "Basketball Match 1",
                category: "Basketball",
                date: "2024-03-10",
                location: "Arena A",
                venue: "Court 1",
                seats: { available: 200, total: 300 },
                img_url: "https://www.shutterstock.com/image-photo/two-basketball-players-action-gym-panorama-232344658"
            },
            {
                match_id: "7",
                name: "Basketball Match 2",
                category: "Basketball",
                date: "2024-03-15",
                location: "Arena B",
                venue: "Court 2",
                seats: { available: 250, total: 400 },
                img_url: "https://www.shutterstock.com/image-photo/basketball-players-on-big-professional-arena-1508680433"
            },
            {
                match_id: "8",
                name: "Basketball Match 3",
                category: "Basketball",
                date: "2024-03-20",
                location: "Arena C",
                venue: "Basketball Stadium",
                seats: { available: 300, total: 500 },
                img_url: "https://www.shutterstock.com/image-illustration/basketball-court-people-fan-sport-arena-542513401"
            },
            {
                match_id: "9",
                name: "Basketball Match 4",
                category: "Basketball",
                date: "2024-03-25",
                location: "Arena D",
                venue: "Court 3",
                seats: { available: 150, total: 250 },
                img_url: "https://www.shutterstock.com/image-photo/basketball-basket-all-going-through-net-150869537"
            },
            {
                match_id: "10",
                name: "Basketball Match 5",
                category: "Basketball",
                date: "2024-03-30",
                location: "Arena E",
                venue: "Indoor Stadium",
                seats: { available: 400, total: 600 },
                img_url: "https://www.shutterstock.com/image-illustration/basketball-arena-373983550"
            },
            {
                match_id: "11",
                name: "Cricket Match 1",
                category: "Cricket",
                date: "2024-04-05",
                location: "Stadium K",
                venue: "Cricket Ground",
                seats: { available: 700, total: 1000 },
                img_url: "https://www.shutterstock.com/image-photo/nottingham-england-31-may-2019-general-1454658809"
            },
            {
                match_id: "12",
                name: "Cricket Match 2",
                category: "Cricket",
                date: "2024-04-10",
                location: "Stadium L",
                venue: "Cricket Ground",
                seats: { available: 800, total: 1100 },
                img_url: "https://www.shutterstock.com/image-photo/cricket-batsman-action-on-professional-stadium-679602739"
            },
            {
                match_id: "13",
                name: "Cricket Match 3",
                category: "Cricket",
                date: "2024-04-15",
                location: "Stadium M",
                venue: "Cricket Ground",
                seats: { available: 900, total: 1200 },
                img_url: "https://www.shutterstock.com/image-illustration/illuminated-round-cricket-stadium-full-fans-1393589663"
            },
            {
                match_id: "14",
                name: "Cricket Match 4",
                category: "Cricket",
                date: "2024-04-20",
                location: "Stadium N",
                venue: "Cricket Ground",
                seats: { available: 1000, total: 1300 },
                img_url: "https://www.shutterstock.com/image-photo/cricket-batsman-action-on-professional-stadium-679602700"
            },
            {
                match_id: "15",
                name: "Cricket Match 5",
                category: "Cricket",
                date: "2024-04-25",
                location: "Stadium O",
                venue: "Cricket Ground",
                seats: { available: 1100, total: 1400 },
                img_url: "https://www.shutterstock.com/image-photo/cricket-player-batsman-showing-aggression-after-702732274"
            },
            {
                match_id: "16",
                name: "Tennis Match 1",
                category: "Tennis",
                date: "2024-05-01",
                location: "Court P",
                venue: "Tennis Arena",
                seats: { available: 200, total: 300 },
                img_url: "https://www.shutterstock.com/image-photo/professional-tennis-player-mixed-media-2138184433"
            },
            {
                match_id: "17",
                name: "Tennis Match 2",
                category: "Tennis",
                date: "2024-05-05",
                location: "Court Q",
                venue: "Tennis Arena",
                seats: { available: 250, total: 350 },
                img_url: "https://www.shutterstock.com/image-photo/young-sports-man-tennis-player-playing-304748492"
            },
            {
                match_id: "18",
                name: "Tennis Match 3",
                category: "Tennis",
                date: "2024-05-10",
                location: "Court R",
                venue: "Tennis Arena",
                seats: { available: 300, total: 400 },
                img_url: "https://www.shutterstock.com/image-illustration/green-grass-tennis-stadium-evening-sky-292960337"
            },
            {
                match_id: "19",
                name: "Tennis Match 4",
                category: "Tennis",
                date: "2024-05-15",
                location: "Court S",
                venue: "Tennis Arena",
                seats: { available: 350, total: 450 },
                img_url: "https://www.shutterstock.com/image-photo/table-tennis-player-making-service-321594698"
            },
            {
                match_id: "20",
                name: "Tennis Match 5",
                category: "Tennis",
                date: "2024-05-20",
                location: "Court T",
                venue: "Tennis Arena",
                seats: { available: 400, total: 500 },
                img_url: "https://www.shutterstock.com/image-illustration/blue-tennis-court-illuminated-indoor-arena-1488828602"
            }
        ];

        // Save dummy data to the database
        await MatchModel.insertMany(dummyMatches);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
    try{
        const req_data = req.body
        const obj = new MatchModel(req_data)
        const result = await obj.save()
        res.send("User Added Successfully")
        } catch(e)
       {
        res.status(500).send("Internal Server Error");
       }
      
};


module.exports = {
   EventData
}