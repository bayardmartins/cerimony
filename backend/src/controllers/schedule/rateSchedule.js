const ScheduleModel = require('../../models/Schedule.model');
const ScheduleController = require('./index');
const jwt = require('jsonwebtoken');

//const ScheduleController = require('./index');
//const AuthController = require('./../auth/index');

async function rateSchedule(req, res) {
    const filter = { _id: req.body.id, }; 
    const user = getUser(req.headers.authorization.split(' ')[1]);
    try{
        const newSchedule = await ScheduleModel.findById(req.body.id).lean();
        const isPersonOne = getIsPersonOne(user,newSchedule);
        isPersonOne ?  newSchedule.person_one.message = message : newSchedule.person_two.message = message;
        const update = { schedule: newSchedule };
        console.log("filter: " + filter);
        console.log("update:");
        console.log(update);
        const data = await ScheduleModel.findOneAndUpdate(filter, update);
        return res.send(data); 
    } catch(err) {
        return res.send({
            message: "Erro ao atualizar"
        });
    }
};

function getUser(token){
    const decode = jwt.verify(token, `${process.env.JWT_KEY}`);
    return user = decode;
}

function getIsPersonOne(user,schedule) {
    console.log(user);
    console.log(schedule.person_one);
    console.log(schedule.person_one.user._id);
    console.log(user.id);
    return schedule.person_one.user._id === user.id;
}

module.exports = {
    rateSchedule
}