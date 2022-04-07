require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
app.use(cors({
    origin: '*'
}));
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());

const partnersRouter = require('./routes/partners')
app.use('/partners', partnersRouter);

app.listen(3000, () => console.log('Server Started'))