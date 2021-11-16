const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const UserController = require('../controllers/user')
const AuthController = require('../controllers/auth')
const userRoutes = Router()

userRoutes.post('/users',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            profile: Joi.string().required()
        }
    }), UserController.saveEntity)

userRoutes.get('/users', AuthController.verifyToken, UserController.getAll)

userRoutes.get('/users/:id', AuthController.verifyToken, UserController.getByID)


module.exports = userRoutes