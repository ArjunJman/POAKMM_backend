// dependencies
const { MatchModel } = require('../models/Models')
//gets Event Details from the Database
const fetchAllMatch = async (req, res) => {
    try {
        const data = await MatchModel.find()
        res.send(data)
    }
    catch (e) {
        res.status(500).send("Internal Server Error");
    }
}
// fetch throughparticular id
const fetchParticularMatch = async (req, res) => {
    try {
        const match_id = req.params.mid;

        const data = await MatchModel.find({ 'match_id': match_id })

        res.send(data)
    }
    catch (e) {
        res.status(500).send("Internal Server Error");
    }
}
// Adding Event in the Database 
const EventData = async (req, res) => {
    if (req.user.email == "om@gmail.com") {
        try {
            const req_data = req.body
            const obj = new MatchModel(req_data)
            const result = await obj.save()
            res.send({ message: "Event Added Successfully" })
        } catch (e) {
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.send({ message: "you are not admin!" })
    }

}
module.exports = {
    fetchAllMatch,
    fetchParticularMatch,
    EventData
}