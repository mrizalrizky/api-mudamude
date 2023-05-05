module.exports = {
    handleError: (error, res) => {
        res.status(error.status || 500).send(error.outputJson || console.log(error))
    }
}