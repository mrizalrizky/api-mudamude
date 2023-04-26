const db = require("../../models")
const jsonMessage = require('../../jsonFormat/jsonMessage')
const mudamudeUserRepo = require('../../repositories/mudamudeUser.repositories')(db)

const getUserInfo = async (req, res) => {
    const username = req.params.username

    if(!username) {
        res.send("USERNAME NOT FOUND!")
    }

    const data = await mudamudeUserRepo.getUserInfo(username)

    res.status(200).send(jsonMessage.jsonSuccess(200, data))
}

const getUserRegisteredEvents = async (req, res) => {
    const username = req.query.username
    
    if(!username) {
        messsage = {
            "indonesian": "Username tidak boleh kosong",
            "english": "Username cannot be empty"
        }
    }

    const data = await mudamudeUserRepo.getUserRegisteredEvents(username)

    message = {
        "indonesian": "Berhasil get data",
        "english": "Data retrieved successfully"
    }
    res.status(200).send(jsonMessage.jsonSuccess(200, message, data))
}

const getUserUploadedEvents = async (req, res) => {
    const username = req.query.username

    const data = await mudamudeUserRepo.getUserUploadedEvents(username)
    console.log(data);
}

module.exports = {
    getUserInfo,
    getUserRegisteredEvents,
    getUserUploadedEvents
}