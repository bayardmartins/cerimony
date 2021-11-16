const UserModel = require('../../models/User.model')
const bcrypt = require("bcrypt")

const UserController = {
    getAll: async (req, res) => {
        const users = await UserModel.find({
            id: { $not: { id: req.user.id } }
        }).lean()
        return res.send({ users });
    },

    getByID: async (req, res) => {
        const user = await UserModel.findById(req.params.id).lean()

        if (!user) {
            return res.status(400).json({
                error: 'User not found!'
            })
        }
        return res.send({ user });
    },

    saveEntity: async (req, res) => {
        const { name, email, password, profile } = req.body
        const hashedPassword = await bcrypt.hash(password, 8)

        const userExistst = await UserModel.findOne({ email })

        if (userExistst) {
            return res.status(400).json({
                error: 'User already exists!'
            })
        }

        const user = {
            name,
            email,
            password: hashedPassword,
            profile
        }

        await UserModel.create(user)

        return res.send({ user })
    },

    deleteEntity: async (req, res) => {
        await UserModel.findByIdAndRemove(req.params.id)
        return res.send()
    }
}
module.exports = UserController
