const UserModel = require('../../models/User.model');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const AuthController = {

    verifyToken: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, `${process.env.JWT_KEY}`);
            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).send({ message: "Falha na autenticação!" });
        }
    },

    authentication: async (req, res) => {
        const user = await UserModel.findOne({ email: req.body.email }).lean();
        if (!user) {
            return res.status(401).send({ message: 'Falha no usuario' })
        }
        if (user.length < 1) {
            return res.status(401).send({ message: 'Falha na autenticação' })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).send({ message: 'Falha na autenticação' })
            }

            if (result) {
                const token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                    `${process.env.JWT_KEY}`,
                    {
                        expiresIn: "1h"
                    });
                return res.status(201).send({
                    message: "Autenticado com sucesso",
                    token: token
                });
            }
            return res.status(401).send({ message: 'Falha na autenticação' })
        })
    }
}

module.exports = AuthController;