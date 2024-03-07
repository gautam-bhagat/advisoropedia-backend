const connectToMongo = require('./db_connect/connection')
connectToMongo();

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const { PORT} = require("./utils/constants")
const port = PORT || 3000



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/auth',require("./route/auth"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})