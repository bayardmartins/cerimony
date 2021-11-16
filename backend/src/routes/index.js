const { Router } = require('express')
const userRoutes = require('./Users.routes')
const scheduleRoutes = require('./Schedules.routes')
const authRoutes = require('./Auth.routes')
const AuthController = require('../controllers/auth')
const routes = Router()

routes.use(userRoutes)
routes.use(scheduleRoutes)
routes.use(authRoutes)



routes.get('/topics', (req, res) => {
    return res.json([
        { id: 1, text: "Performance" },
        { id: 2, text: "FeedBack (Líder < -- > Liderado)" },
        { id: 3, text: "Desenvolvimento" },
        { id: 4, text: "Evolução Profissional" },
        { id: 5, text: "Clima e Relacionamento" },
        { id: 6, text: "Pessoal" }
    ])
})

routes.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to Ahfeed!'
    })
})

module.exports = routes