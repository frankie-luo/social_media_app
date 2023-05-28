const express = require('express')
const path = require('path')
const app = express()
const { AuthRouter, UserRouter, PostRouter, UploadRouter } = require('./routes')
const cors = require('cors')

require('dotenv').config({ path: path.join(__dirname, '/.env') })

app.use(express.json())
app.use(cors({origin: ['http://localhost:3000']}))

app.use('/public/images', express.static(path.join(__dirname, '/public/images')))

app.use('/', AuthRouter)
app.use('/users', UserRouter)
app.use('/posts', PostRouter)
app.use('/upload', UploadRouter)

app.get('/', (req, res) => res.status(200).send('hello'))

app.all('*', (req, res) => {
  res.status(400).json({ error: "InvalidURI", description: `The URI ${req.url} is not valid.` })
})

module.exports = app