const mongoose = require('mongoose')
const { UserModel }  = require('../models/UserModel')

const saveUser = async (req,res)=>
{
    try{
        const req_data = req.body
        const obj = new UserModel(req_data)
        const result = await obj.save()
        res.send("User Added Successfully")
        } catch(e)
       {
        res.status(500).send("Internal Server Error");
       }
}


module.exports = {
    saveUser,
  };