const { check, validationResult } = require('express-validator')


exports.validateUser = 
[
    check('mail')
        .trim()
        .not()
        .isEmpty()
        .bail()
        .withMessage('Email can not be Empty!')
        .isEmail()
        .withMessage('Invalid Email address!')
        .bail(),
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username can not be Empty!')
        .bail()
        .isLength({ min: 6})
        .withMessage('Minimum 6 characters required!')
        .bail()
        .isLength({ max: 20})
        .withMessage('Maximum 20 characters required!')
        .bail(),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password can not be Empty!')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Minimum 6 characters required!')
        .bail()
        .isLength({ max: 40 })
        .withMessage('Maximum 20 characters required!')
        .bail(),
]