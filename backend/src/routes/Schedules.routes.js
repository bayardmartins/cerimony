const { Router } = require('express')
const ScheduleController = require('./../controllers/schedule')
const scheduleRoutes = Router()
const AuthController = require('../controllers/auth')

scheduleRoutes.get('/schedules', AuthController.verifyToken, ScheduleController.getAll);
scheduleRoutes.get('/schedules/:id', AuthController.verifyToken, ScheduleController.getByID);
scheduleRoutes.post('/schedules', AuthController.verifyToken, ScheduleController.saveEntity);

module.exports = scheduleRoutes