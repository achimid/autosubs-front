require('dotenv').config()

const maxAge = process.env.NODE_ENV == 'production' ? 7*86400000 : 0

const cors = require('cors')
const express = require('express')
const compression = require('compression')
const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.disable('x-powered-by')

app.use(express.static('public', { maxAge, extensions:['html'] }))
app.use('/healthcheck', require('./healthcheck/healthcheck'))

app.listen(process.env.PORT)