const ScheduleModel = require('../../models/Schedule.model');

async function getAll(req, res) {
    const idUser = req.user.id
    
    // ScheduleModel.Types.IbjectId(idUser)
    const schedulesData = await ScheduleModel.find({
        $or: [
            {'person_one.user': idUser},
            {'person_two.user': idUser}
        ]
    }).lean();

    const schedules = schedulesData.map(sch => {
        const createdByMe = sch.person_one.user == idUser
        const user = sch.person_one.user == idUser ? sch.person_two.user : sch.person_one.user

        const objSch = {
            id: sch._id,
            date: sch.date,
            hour: sch.hour,
            state: sch.state,
            topics: sch.topics,
            description: sch.description,
            link: sch.link || "",
            createdByMe: createdByMe,
            user: user,
        } 

        return objSch
    })

    return res.send({ schedules });
}

async function getByID(req, res) {
    const schedule = await ScheduleModel.findById(req.params.id).lean();

    if (!schedule) {
        return res.status(400).json({
            error: 'Schedule not found!'
        })
    }

    return res.send({ schedule });
}

module.exports = {
    getAll,
    getByID
}