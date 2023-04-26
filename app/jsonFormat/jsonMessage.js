const jsonSuccess = (errCode, successMsg, data) => {
    return {
        "success_code": errCode,
        "success_message": successMsg,
        "data": data
    }
}

const jsonFailed = (errCode, errorMsg) => {
    return {
        "error_code": errCode || 500,
        "error_message": errorMsg
    }
}

// bikin function yang sama dengan nama berbeda
// let jsonFailed = jsonSuccess

module.exports = {
    jsonSuccess,
    // jsonFailed: jsonSuccess
    jsonFailed
}