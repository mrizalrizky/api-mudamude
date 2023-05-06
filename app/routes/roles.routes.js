module.exports = (app) => {
    let router = require('express').Router()
    let roleController = require('../controllers/roles.controller')

    router.get('/all', roleController.getAllRoles)
    router.get('/exclude', roleController.getAllRoleExcludeUserRole)

    app.use('/api/roles', router)
}