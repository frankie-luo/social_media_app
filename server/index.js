const app = require('./server')
const connection = require('./config/db')

const port = 3001;
connection.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is up on port ${port}: http://localhost:${port}`)
    })
})
