const jsonMessage = require('../jsonFormat/jsonMessage')

const handleError = (error, res, errCode, errorMsg) => {
    console.log(error.errno);
    // res.send(jsonMessage.jsonFailed(errCode, errorMsg))
}

const throwError = (errCode, errorMsg) => {
    const error = new Error(errorMsg)
    error.code = errCode
    throw error
}

module.exports = {
    handleError,
    throwError
}