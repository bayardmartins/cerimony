const ScheduleModel = require('../../models/Schedule.model');

async function deleteEntity(req, res) {
    const id = await ScheduleModel.findByIdAndRemove(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'Schedule not found!'})
    }
    
    return res.send();
}

module.exports = {
    deleteEntity
}