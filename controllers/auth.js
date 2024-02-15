
//dependenciies
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { UserModel,TicketModel }  = require('../models/Models')


// MongoConnect
const mongoose = require('mongoose')
const conn_str = "mongodb+srv://aiarjun027:arjun1234@cluster0.beh4ixw.mongodb.net/POAKMM?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(()=> console.log("Connected Successsfully")).catch((err)=> console.log(err))



//SignUp
const saveUser = async (req,res)=>
{
    try{
        const req_data = req.body
        const obj = new UserModel(req_data)
        await obj.save()
        res.send("User Added Successfully")
        } catch(e)
       {
        res.status(500).send("Internal Server Error");
       }
}


// Login
const login = async (req,res) => {
    const data = await UserModel.find()
    // Read username and password from request body
    console.log(req.body)
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = await data.find(u => { return u.username === username && u.password === password });
    console.log(user);


    // Validating the token
    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,email: user.email }, accessTokenSecret);
        console.log(accessToken)
        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
}


// send UserDetail to Front
const UserDetail = async (req,res) => {
    if (req.user){
        const ticket_details = await TicketModel.find({"email":req.user.email})
        res.send(ticket_details)
    }
}

module.exports = {
    login,
    saveUser,
    UserDetail
}