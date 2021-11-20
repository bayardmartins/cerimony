const ScheduleModel = require('../../models/Schedule.model');

function parserEntity(data, currentUser) {
    console.log(data);
    const person = JSON.parse(JSON.stringify(data.person))
    delete data.person;

    data.person_one = null;
    data.person_two = null;

    data.person_one = {
        user: currentUser.id,
        accepted: true,
        real_topic: [],
        message: ""
    };
    data.person_two = {
        user: person,
        accepted: false,
        real_topic: [],
        message: ""
    };
    return data;
}

async function saveEntity(req, res) {
    console.log('1');
    const { created, date, hour, state, topics, description, person_one, person_two } = req.body
    const currentUser = { id: req.user.id }  // temp get by JWT
    const exists = await dateTimeValidation(date, hour, req.user.id)

    if (!exists) {
        try {
            const data = parserEntity({ ...req.body }, currentUser)
            const schedule = await ScheduleModel.create(data);
            return res.send(schedule);
        } catch (error) {
            console.log(error)
            return res.status(500).send({message: "Erro interno!"});
        }
    }
    else {
        return res.send({
            message: "Já existe uma reunião agendada no período selecionado"
        });
    }

}

async function dateTimeValidation(date, hour, idUser) {
    const schedules = await ScheduleModel.find({
        id: idUser,
        date: date,
        hour: hour
    })

    return schedules.length > 0;
}

module.exports = {
    saveEntity
}