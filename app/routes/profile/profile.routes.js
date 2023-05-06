module.exports = (app) => {
    let router = require('express').Router()
    let profileController = require('../../controllers/profile/profile.controller')

    router.get('/uploaded-events', profileController.getUserUploadedEvents)
    router.get('/registered-events', profileController.getUserRegisteredEvents)
    router.get('/:username', profileController.getUserInfo)

    app.use('/api/profile', router)
}