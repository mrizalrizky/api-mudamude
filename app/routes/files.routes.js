module.exports = (app) => {
    let router = require('express').Router()
    let fileController = require('../controllers/files.controller')
    
    router.post('/', fileController.insertNewFile)
    router.get('/', fileController.getFile)

    app.use('/api/files', router)
}