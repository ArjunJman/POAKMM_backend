// dependencies
const {MatchModel }  = require('../models/Models')


//MongoDB
const mongoose = require('mongoose')
const conn_str = "mongodb+srv://aiarjun027:arjun1234@cluster0.beh4ixw.mongodb.net/POAKMM?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(()=> console.log("Connected Successsfully")).catch((err)=> console.log(err))


//gets Event Details from the Database

const fetchAllMatch = async (req,res) => {
    try{
        const data = await MatchModel.find()
        res.send(data)
    }
    catch(e)
       {
        res.status(500).send("Internal Server Error");
       }
}


// fetch throughparticular id
const fetchParticularMatch = async (req,res) => {
    console.log("inside")
    try{
        const match_id = req.params.mid;
        
        const data = await MatchModel.find({'match_id':match_id})
        
        res.send(data)
    }
    catch(e)
       {
        res.status(500).send("Internal Server Error");
       }
}


// Adding Event in the Database 
const EventData = async(req,res)=>
{
        try{
            const req_data = req.body
            const obj = new MatchModel(req_data)
            const result = await obj.save()
            res.send({message:"Event Added Successfully"})
            } catch(e)
           {
            res.status(500).send("Internal Server Error");
           }
}

module.exports = {
    fetchAllMatch,
    fetchParticularMatch,
    EventData
}