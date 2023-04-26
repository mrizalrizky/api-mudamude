const express = require('express')
const app = express()
const cors = require('cors')
const Log = require('./app/utils/Logging')
require('dotenv').config()

const corsOptions = { origin: '*' }
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Hit Logger
app.use(Log.printLog())

// Routes
require('./app/routes/index')(app)

app.use('/api/health-check', (req, res) => {
    res.status(200).send('Welcome to MudaMude')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
}) 