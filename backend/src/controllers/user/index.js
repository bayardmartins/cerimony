const UserModel = require('../../models/User.model')
const bcrypt = require("bcrypt")

const UserController = {
    getAll: async (req, res) => {
        try{
            const users = await UserModel.find({
                _id: { $ne: req.user.id }
                //team: req.user.team
            })
            return res.send({ users });
        } catch (err) {
            console.log('error:');
            console.log(err);
            return res.status(500);
        }
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

    getTeammates: async (req, res) => {
        const users = await UserModel.find({
            id: { $not: { id: req.user.id } },
            team: req.user.team
        }).lean()
        return res.send({ users });
    },

    saveEntity: async (req, res) => {
        const { name, email, password, profile, team } = req.body
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
            profile,
            team
        }

        await UserModel.create(user)

        return res.send({ user })
    },

    deleteEntity: async (req, res) => {
        await UserModel.findByIdAndRemove(req.params.id)
        return res.send()
    },

    assignTeam: async (req, res) => {
        const filter = { _id : req.params.id}
        const update = { team: req.body }    
        let user = await UserModel.findOneAndUpdate(filter,update, { new: true } )
        if (!user) {
            return res.status(400).json({
                error: 'User not found!'
            })
        }
        return res.send( {user })
    },
}
module.exports = UserController
