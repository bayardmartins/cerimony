const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const AuthController = require('../controllers/auth')
const authRoutes = Router()


authRoutes.post('/login', AuthController.authentication)

module.exports = authRoutes