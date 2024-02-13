const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { UserModel,MatchModel }  = require('../models/UserModel')

const mongoose = require('mongoose')
const conn_str = "mongodb+srv://aiarjun027:arjun1234@cluster0.beh4ixw.mongodb.net/POAKMM?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(()=> console.log("Connected Successsfully")).catch((err)=> console.log(err))


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

module.exports = {
    fetchAllMatch
}