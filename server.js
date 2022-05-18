
import express from 'express'
import { Server as http } from 'http'
import { Server as ioServer } from 'socket.io'
import { sqlite3Create, mysqlCreate } from './db/dbConnection.js'

import api from './routes/api.js' //? Router
import { motortemplates as motor } from './templates/motortemplates.js' //? Motor de Plantillas
import sockets from './sockets/sockets.js' //? Sockets IO

const app = express()
const httpserver = http(app)
export const io = new ioServer(httpserver)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(api)
sockets(io)
motor(app)

mysqlCreate.createDB()
sqlite3Create.createDB()


const PORT = process.env.PORT || 8080

const server = httpserver.listen(PORT, () => {
    console.log(`Escuchando servidor desde el puerto ${server.address().port} - http://localhost:${PORT}`)
})
httpserver.on('error', error => console.log('error', error))