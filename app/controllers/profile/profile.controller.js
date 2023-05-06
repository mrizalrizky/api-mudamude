const db = require("../../models")
const jsonMessage = require('../../jsonFormat/jsonMessage')
const service = require('../../services/errorHandler')
const mudamudeUserRepo = require('../../repositories/mudamudeUser.repositories')(db)
let message
let myError = new Error()

const getUserInfo = async (req, res) => {
    try {
        const username = req.params.username
    
        if(!username) {
            messsage = {
                "indonesian": "Username tidak boleh kosong",
                "english": "Username cannot be empty"
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }
    
        const data = await mudamudeUserRepo.getUserInfo(username)
        message = {
            "indonesian": "Berhasil GET Data",
            "english": "Successfully Retrieved Data"
        }
    
        res.status(200).send(jsonMessage.jsonSuccess(200, message, data))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getUserRegisteredEvents = async (req, res) => {
    try {
        const username = req.query.username
        
        if(!username) {
            messsage = {
                "indonesian": "Username tidak boleh kosong",
                "english": "Username cannot be empty"
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }
    
        const data = await mudamudeUserRepo.getUserRegisteredEvents(username)
    
        message = {
            "indonesian": "Berhasil get data",
            "english": "Data retrieved successfully"
        }
        res.status(200).send(jsonMessage.jsonSuccess(200, message, data))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getUserUploadedEvents = async (req, res) => {
    try {
        const username = req.query.username
        
        if(!username) {
            message = {
                "indonesian": "Username tidak boleh kosong",
                "english": "Username cannot be empty",
            }
            myError.status - 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        const data = await mudamudeUserRepo.getUserUploadedEvents(username)

        message = {
            "indonesian": "Berhasil GET data",
            "english": "Successfully Retrieved Data",
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, data))
    } catch (error) {
        service.handleError(error, res)
    }
}

module.exports = {
    getUserInfo,
    getUserRegisteredEvents,
    getUserUploadedEvents
}