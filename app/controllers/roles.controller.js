let db = require('../models/index')
const service = require('../services/errorHandler')
const jsonMessage = require('../jsonFormat/jsonMessage')
let masterRolesRepo = require('../repositories/roles.repositories')(db)
let message
let myError = new Error()

const getAllRoles = async (req, res) => {
    try {
        const getData = await masterRolesRepo.getAllRoles()

        message = {
            "indonesian": "Berhasil GET Data",
            "english": "Successfully Retrieved Data",
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-00', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

const getAllRoleExcludeUserRole = async (req, res) => {
    try {
        const username = req.query.username

        if(!username) {
            message = {
                "indonesian": "Username tidak boleh kosong",
                "english": "Username cannot be empty"
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        const getData = await masterRolesRepo.getAllRoleExcludeUserRole(username)

        message = {
            "indonesian": "Berhasil GET Data",
            "english": "Successfully Retrieved Data",
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-00', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

module.exports = {
    getAllRoles,
    getAllRoleExcludeUserRole
}