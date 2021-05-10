const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

const {
    validateUser,
} = require ('../middlewares/validators/validation')


router.post('/', validateUser, controller.registration) 
router.post('/login', controller.login)
router.get('/users', authMiddleware,  controller.getUsers)
router.get('/id', authMiddleware, controller.userId)

module.exports = router