module.exports = (app) => {
    let router = require('express').Router()
    const authController = require('../../controllers/auth/auth.controller')

    router.post('/register', authController.userSignUp)
    router.post('/login', authController.userLogin)

    app.use('/api/auth', router)
}