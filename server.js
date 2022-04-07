require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({
    origin: '*'
}));

app.use(express.json());

const partnersRouter = require('./routes/partners')
app.use('/partners', partnersRouter);

app.listen(3000, () => console.log('Server Started'))