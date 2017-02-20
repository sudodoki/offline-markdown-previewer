const path = require('path')
const express = require('express')
const serveStatic = require('serve-static')

const app = express()

app.use(express.static(path.resolve(__dirname, '../client')))
app.listen(process.env.npm_package_config_port)

app.get('/', (req, res) => {
    res.send('Connected')
})

console.log(`Listening on ${process.env.npm_package_config_port}`)