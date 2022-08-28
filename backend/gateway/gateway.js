const express = require('express')
const routes = require('./routes/index')
const helmet = require('helmet')
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessState : 200
}

//Middleware
app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/', routes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    console.error('handler')
    res.status(500).send();
})


//Server Connection
const portnumber = process.env.PORT || 3000
app.listen(portnumber, ()=>{
    console.log(`listening on: ${portnumber}`)
})