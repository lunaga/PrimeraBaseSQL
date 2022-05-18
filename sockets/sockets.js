import { sqlite3 } from './../db/dbConnection.js'
import msjController from '../db/msjController.js'

const mensajes = new msjController(sqlite3, 'mensajes')

async function sockets(io) {

    const messages = await mensajes.loadAll()

    io.on('connection', socket => {
        // Registro conexiones
        console.log("un usuario se ha conectao'")

        //? LISTA DE PRODUCTOS ===================================================

        // Emitir lista de productos
        socket.on('quest', confirm => {
            if (confirm === 'ok') {
                io.sockets.emit('productos', 'reload')
            }
        })

        //? CHAT =================================================================

        socket.emit('messages', messages)

        socket.on('new-message', msj => {
            messages.push(msj)
            mensajes.save(msj)
            io.sockets.emit('messages', messages)
        })
    })
}

export default sockets