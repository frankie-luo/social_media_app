const express = require('express')
const path = require('path')
const app = express()
const { AuthRouter, UserRouter, PostRouter } = require('./routes')

require('dotenv').config({ path: path.join(__dirname, '/.env') })

app.use(express.json())

app.use(AuthRouter)
app.use('/users', UserRouter)
app.use('/posts', PostRouter)

app.get('/', (req, res) => res.status(200).send('hello'))

app.all('*', (req, res) => {
  res.status(400).json({ error: "InvalidURI", description: `The URI ${req.url} is not valid.` })
})

module.exports = app