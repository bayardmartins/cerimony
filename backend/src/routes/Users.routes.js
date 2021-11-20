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
            profile: Joi.string().required(),
            team: Joi.string(),
        }
    }), UserController.saveEntity)

userRoutes.get('/users', AuthController.verifyToken, UserController.getAll)

userRoutes.get('/teammates', AuthController.verifyToken, UserController.getTeammates)

userRoutes.get('/users/:id', AuthController.verifyToken, UserController.getByID)

userRoutes.put('/user/:id/team', 
    celebrate({
        [Segments.BODY]:{
            team: Joi.string().required(),
        }
    }), AuthController.verifyToken, UserController.assignTeam)

module.exports = userRoutes