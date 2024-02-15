const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { UserModel,TicketModel }  = require('../models/Models')


// Details about events and users and each user's ticket
const GetAdminDashboard = async (req,res) => {
    if (req.user.role == undefined){
        const all_users = await UserModel.find()
        let all_tickets = {}
        const total_users = await UserModel.countDocuments({});
        const total_tickets = await TicketModel.countDocuments({});
        console.log(total_tickets,total_users);

      

        for (user in all_users){
            const ticket = await TicketModel.find({email:all_users[user].email})
            all_tickets[all_users[user].email] = ticket
            
        }   

        const details = {
            "total_users":total_users,
            "total_tickets":total_tickets,
            "all_tickets":all_tickets
        }
        await res.send(details);
    }
}

module.exports = {
    GetAdminDashboard
}