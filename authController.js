const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('./config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
} 

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Errrrorrr', errors})
            }
            const {mail, username, password} = req.body
            const candidate = await User.findOne({mail})
            if (candidate) {
                return res.status(400).json({message:'yeast yze'})
            }
            const hashPassword = bcrypt.hashSync(password, 7) 
            const userRole = await Role.findOne({value: 'User'})
            const user = new User({mail, username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message:'Complettetti'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'dont know anything'})
        }
    }

    async login (req, res) {
        try {
            const{mail, username, password} = req.body
            const user = await User.findOne({mail})
            if (!user) {
                return res.status(400).json({message: 'Nety Usera'})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: 'Nepravelnii paroll'})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'error login'})
        }
    }

    async getUsers (req, res) {
        try {
            const users = await User.find()
            res.json('server work')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()