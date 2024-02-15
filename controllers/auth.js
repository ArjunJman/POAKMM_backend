
//dependenciies
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { MatchModel,UserModel,TicketModel }  = require('../models/Models')


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
    try{
        if (req.user){
            console.log(req.user.email)
            const ticket_details = await TicketModel.find({"email":req.user.email})
            
            var TicketDetails = []
            for (ticket in ticket_details){
                console.log("inn")
                var ticketDataToBeSent = JSON.parse(JSON.stringify(ticket_details[ticket]))
                const match_id = ticket_details[ticket].match_id
                
                let matchData = await MatchModel.findOne({ 'match_id': match_id });
                console.log(matchData.venue)
                // ticketDataToBeSent.match_id = match_id
                ticketDataToBeSent.match_name = matchData.name
                console.log("INin")
                ticketDataToBeSent.venue = matchData.venue
                console.log(ticketDataToBeSent)

                TicketDetails.push(ticketDataToBeSent)

            }
            res.send(TicketDetails)
        }
    }
    catch{
        res.send({message:"Error sending data!"})
    }
    
}

module.exports = {
    login,
    saveUser,
    UserDetail
}