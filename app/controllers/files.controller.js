const db = require('../models/index')
const jsonMessage = require('../jsonFormat/jsonMessage')
const service = require('../services/errorHandler')
const filesRepo = require('../repositories/files.repositories')(db)
const FileTypeConstant = require('../constants/fileTypes.constant')
const FolderPathConstant = require('../constants/folderPath.constant')
let myError = new Error()
let message

const insertNewFile = async (req, res) => {
    try {
        const fileName = req.body.filename
        const pathName = req.body.pathname
        const id_event = req.body.id_event || undefined
        const id_user = req.body.id_user || undefined

        if(!fileName) {
            message = {
                "indonesian": "File Name tidak boleh kosong",
                "english": "File Name cannot be empty"
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        if(!pathName) {
            message = {
                "indonesian": "Path Name tidak boleh kosong",
                "english": "Path Name cannot be empty"
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }
        
        let fileType = getFileType(pathName)
        let folderPath = getFolderPath(pathName)

        const postData = await filesRepo.insertNewFile(id_user, id_event, fileName, folderPath, fileType)

        if(!postData) {
            message = {
                "indonesian": "Gagal Post Data",
                "english": "Failed to Post Data",
            }
            myError.status = 500,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-500', message)
            throw myError
        }

        message = {
            "indonesian": "Berhasil POST Data",
            "english": "Successfully POST Data",
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message))
    } catch (error) {
        service.handleError(error, res)
    }
}

function getFileType (pathName) {
    let fileType
    switch(pathName) {
        case '/event': {
            fileType = fileTFileTypeConstant.EVENT_BANNER
            break;
        }
        
        case '/verify': {
            fileType = FileTypeConstant.FOTO_KTP
            break;
        }

        case '/profile': {
            fileType = FileTypeConstant.USER_AVATAR
            break;
        }
    }

    return fileType
}

function getFolderPath (pathName) {
    let folderPath
    switch(pathName) {
        case '/event': {
            folderPath = FolderPathConstant.EVENT_BANNER_PATH
            break;
        }
        
        case '/verify': {
            folderPath = FolderPathConstant.FOTO_KTP_PATH
            break;
        }

        case '/profile': {
            folderPath = FolderPathConstant.USER_AVATAR_PATH
            break;
        }
    }
    return folderPath
}

const getFile = async (req, res) => {
    try {
        const { id_user, id_event } = req.query || undefined
        
        if(!id_user && !id_event) {
            message = {
                "indonesian": "ID User atau ID Event tidak boleh kosong",
                "english": "ID User or ID Event cannot be empty",
            }
            myError.status = 400,
            myError.outputJson = jsonMessage.jsonFailed('MUDAMUDE-400', message)
            throw myError
        }

        const getData = await filesRepo.getFileByIdEventOrUser(id_event, id_user)

        message = {
            "indonesian": "Berhasil GET Data",
            "english": "Successfully Retrieved Data"
        }

        res.status(200).send(jsonMessage.jsonSuccess('MUDAMUDE-200', message, getData))
    } catch (error) {
        service.handleError(error, res)
    }
}

module.exports = {
    insertNewFile,
    getFile
}