const db = require('../../models/index')
const service = require('../../services/errorHandler')
const jsonMessage = require('../../jsonFormat/jsonMessage')
const masterEventRepo = require('../../repositories/master/masterEvent.repositories')(db)
const moment = require('moment')
const { createEventSlug } = require('../../utils/createEventSlug')
let message
let myError = new Error()

const uploadEvent = async (req, res) => {
    const { id_category, title, description, id_organizer, location } = req.body
    const ticketPrice = req.body.ticket_price
    const eventDate = req.body.event_date
    const eventTime = req.body.event_time
    const eventDuration = req.body.duration

    try {
        if(!title) {
            message = {
                "indonesian": "Title tidak boleh kosong",
                "english": "Title cannot be empty"
            }
            myError.status = 400
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        if(!id_category) {
            message = {
                "indonesian": "ID Category tidak boleh kosong",
                "english": "ID Category cannot be empty"
            }
            myError.status = 400
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }
    
        if(!id_organizer) {
            message = {
                "indonesian": "ID Organizer tidak boleh kosong",
                "english": "ID Organizer cannot be empty"
            }
            myError.status = 400
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }
        
        if(!location) {
            message = {
                "indonesian": "Lokasi tidak boleh kosong",
                "english": "Location cannot be empty"
            }
            myError.status = 400
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        if(!ticketPrice) {
            message = {
                "indonesian": "Harga Tiket tidak boleh kosong",
                "english": "Ticket Price cannot be empty",
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }
    
        if(!eventDate) {
            message = {
                "indonesian": "Tanggal Event tidak boleh kosong",
                "english": "Event Date cannot be empty"
            }
            myError.status = 400
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        if(!eventTime) {
            message = {
                "indonesian": "Event Time tidak boleh kosong",
                "english": "Event Time cannot be empty",
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        if(!eventDuration) {
            message = {
                "indonesian": "Duration tidak boleh kosong",
                "english": "Duration cannot be empty",
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        const slug = await createEventSlug(title)
        
        const postData = await masterEventRepo.uploadEvent(id_category, title, slug, description, id_organizer, location, ticketPrice, eventDate, eventTime, eventDuration)
        if(!postData) {
            message = {
                "indonesian": "Gagal POST Data",
                "english": "Failed to POST Data",
            }
            myError.status = 500,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-500', message)
            throw myError
        }
        
        message = {
            "english": "Event created successfully",
            "indonesian": "Event berhasil dibuat"
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, postData))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getAllEvent = async (req, res) => {
    try {
        const getData = await masterEventRepo.getAllEvent()

        if(!getData) {
            message = {
                "indonesian": "Gagal GET Data",
                "english": "Failed To Retrieve Data"
            }

            myError.status = 500,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-500', message)
            throw myError
        }

        message = {
            "indonesian": "Berhasil GET Data",
            "english": "Successfully Retrieved Data"
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getEventDetail = async (req, res) => {
    try {
        const slug = req.params.slug

        if(!slug) {
            message = {
                "indonesian": "Slug tidak boleh kosong",
                "english": "Slug cannot be empty"
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        const getData = await masterEventRepo.getEventDetail(slug)

        message = {
            "indonesian": "Berhasil GET Data",
            "english": "Successfully Retrieved Data",
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getListUpcomingEvent = async (req, res) => {
    try {
        // Event yang akan diadakan dalam 7 hari
        const startDate = moment().format('YYYY-MM-DD')
        const endDate = moment().add(7, 'days').format('YYYY-MM-DD')

        const getData = await masterEventRepo.getListUpcomingEvent(startDate, endDate)

        message = {
            "indonesian": "Berhasil GET Data",
            "english": "Successfully Retrieved Data",
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getListPopularEvent = async (req, res) => {

}

const getListEventByTitle = async (req, res) => {
    try {
        const title = req.params.title

        if(!title) {
            message = {
                "indonesian": "Title tidak boleh kosong",
                "english": "Title cannot be empty",
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)

            throw myError
        }

        const getData = await masterEventRepo.getListEventByTitle(title)

        message = {
            "indonesian": "Berhasil GET data",
            "english": "Successfully retrieved data",
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getListEventByDate = async (req, res) => {
    let date = req.params.date
    date = moment(date).format('YYYY-MM-DD')

    try {
        if(!date) {
            message = {
                "indonesian": "Tanggal tidak boleh kosong",
                "english": "Date cannot be empty",
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        const getData = await masterEventRepo.getListEventByDate(date)
    
        message = {
            "indonesian": "Berhasil GET data",
            "english": "Successfully retrieved data",
        }
    
        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getListEventByLocation = async (req, res) => {
    try {
        const location = req.params.location

        if(!location) {
            message = {
                "indonesian": "Lokasi tidak boleh kosong",
                "english": "Location cannot be mepty",
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        const getData = await masterEventRepo.getListEventByLocation(location)

        message = {
            "indonesian": "Berhasil GET data",
            "english": "Successfully Retrieved Data"
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getListEventByCategory = async (req, res) => {
    try {
        const id_category = req.params.id_category

        if(!id_category) {
            message = {
                "indonesian": "ID Category tidak boleh kosong",
                "english": "ID Category cannot be empty",
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        const getData = await masterEventRepo.getListEventByCategory(id_category)

        message = {
            "indonesian": "Berhasil GET Data",
            "english": "Successfully Retrieved Data",
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

module.exports = {
    uploadEvent,
    getAllEvent,
    getEventDetail,
    getListUpcomingEvent,
    getListPopularEvent,
    getListEventByTitle,
    getListEventByDate,
    getListEventByLocation,
    getListEventByCategory
}