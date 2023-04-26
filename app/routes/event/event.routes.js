module.exports = (app) => {
    let router = require('express').Router()
    const eventController = require('../../controllers/event/event.controller')

    router.post('/upload-event', eventController.uploadEvent)

    app.use('/api/event', router)
}