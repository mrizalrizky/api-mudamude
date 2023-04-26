module.exports = (app) => {
    let router = require('express').Router()
    let profileController = require('../../controllers/profile/profile.controller')

    // router.get('/:username', profileController.getUserInfo)
    router.get('/uploaded-events', profileController.getUserUploadedEvents)
    router.get('/registered-events', profileController.getUserRegisteredEvents)

    app.use('/api/profile', router)
}