const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { UserModel,TicketModel }  = require('../models/Models')

const GetAdminDashboard = async (req,res) => {
    if (req.user.role == undefined){
        const all_users = await UserModel.find()
        // const all_tickets = await TicketModel.find()
        let all_tickets = {}
        const total_users = await UserModel.countDocuments({});
        const total_tickets = await TicketModel.countDocuments({});
        console.log(total_tickets,total_users);

        // const all_tickets = all_users.forEach(async (user) => {
        //     const ticket = await TicketModel.find({email:user.email})
        //     all_tickets_arr[user.email] = ticket
        //     //console.log(all_tickets)
        //     return all_tickets_arr
        // })

        for (user in all_users){
            const ticket = await TicketModel.find({email:all_users[user].email})
            all_tickets[all_users[user].email] = ticket
            //console.log(all_tickets)
        }   

        console.log(all_tickets);
        await res.send(all_tickets);
    }
}

module.exports = {
    GetAdminDashboard
}