const db = require('../../models/index')
const service = require('../../services/errorHandler')
const jsonMessage = require('../../jsonFormat/jsonMessage')
const masterEventRepo = require('../../repositories/master/masterEvent.repositories')(db)
let message
let myError = new Error()

const uploadEvent = async (req, res) => {
    // const { id_category, title, description, organizer_name, location, date } = req.body
    const id_category = req.body.id_category
    const title = req.body.title
    const description = req.body.description
    const organizer_name = req.body.organizer_name
    const location = req.body.location
    const date = req.body.date

    try {
        if(!id_category) {
            message = {
                "indonesian": "ID Category tidak boleh kosong",
                "english": "ID Category cannot be empty"
            }
            myError.status = 500
            myError.outputJson = jsonMessage.jsonFailed(500, message)
            throw myError
        }
        
        if(!title) {
            message = {
                "indonesian": "Title tidak boleh kosong",
                "english": "Title cannot be empty"
            }
            myError.status = 500
            myError.outputJson = jsonMessage.jsonFailed(500, message)
            throw myError
        }
    
        if(!organizer_name) {
            message = {
                "indonesian": "Organizer name tidak boleh kosong",
                "english": "Organizer name cannot be empty"
            }
            myError.status = 500
            myError.outputJson = jsonMessage.jsonFailed(500, message)
            throw myError
        }
        if(!location) {
            message = {
                "indonesian": "Lokasi tidak boleh kosong",
                "english": "Location cannot be empty"
            }
            myError.status = 500
            myError.outputJson = jsonMessage.jsonFailed(500, message)
            throw myError
        }
    
        if(!date) {
            message = {
                "indonesian": "Tanggal tidak boleh kosong",
                "english": "Date cannot be empty"
            }
            myError.status = 500
            myError.outputJson = jsonMessage.jsonFailed(500, message)
            throw myError
        }
    } catch (error) {
        service.handleError(error, res, error.status || 500, message)
    }
    
    const postData = await masterEventRepo.uploadEvent(id_category, title, description, organizer_name, location, date)
    message = {
        "english": "Event created successfully",
        "indonesian": "Event berhasil dibuat"
    }
    res.status(200).send(jsonMessage.jsonSuccess(200, message, postData))


}

module.exports = {
    uploadEvent,
}