import {DATABASE_URL} from "./constants";

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to mongodb database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('server started'))
