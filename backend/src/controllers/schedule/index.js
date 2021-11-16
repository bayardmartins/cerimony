const getEntity = require('./getEntity')
const deleteEntity = require('./deleteEntity')
const saveEntity = require('./saveEntity')
const rateSchedule = require('./rateSchedule')

const ScheduleController = {
    getAll: getEntity.getAll,
    getByID: getEntity.getByID,
    saveEntity: saveEntity.saveEntity,
    deleteEntity: deleteEntity.deleteEntity,
    rateSchedule: rateSchedule.rateSchedule,
}

module.exports = ScheduleController;