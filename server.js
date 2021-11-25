const express = require('express')
const app = express()
const cors = require('cors');

//const bodyParser = require('body-parser')

app.use(express.json())
app.use(cors());

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

const entry = require('./controllers-routers/routes')
app.use('/entries', entry) 

app.get('/', (req,res) =>{
    res.status(200).send('Server is up and running');
})

app.post('/', (req,res) =>{
    res.status(405).send('We dont do that here')
})

module.exports = app;