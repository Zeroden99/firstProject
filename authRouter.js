const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middlewaree/authMiddleware')

router.post('/registration', [
    check('mail', 'ведите коректний mail').isEmail(),
    check('username', 'не может бить пустим').isLength({min:6, max:20}),
    check('password', 'Не менше 6 и не больше 40').isLength({min:6, max:40})
], controller.registration) 
router.post('/login', controller.login)
router.get('/users', authMiddleware, controller.getUsers)


module.exports = router