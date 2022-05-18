import express from 'express'
import { io } from '../server.js'
// DB 
import { mysql } from '../db/dbConnection.js'
import dbController from '../db/dbControllers.js'

const productos = new dbController(mysql, 'productos')


//? API Router (Handlebars) =====================================================================

const api = express.Router()

// API Middleware (for PUT) ====================================================================

api.use(function (req, res, next) {
    if (req.originalUrl === '/api/productos/:id') {
        if (req.method === 'POST') { req.method = 'PUT' }
    }
    next()
})

// FORMULARIO MIDDLEWARE ===========================================================

let option = true

api.use(function (req, res, next) {
    io.on('connection', socket => {
        socket.emit('input-res', option)
        socket.on('input-req', data => {
            option = data
        })
    })
    next()
})

api.get('/api/productos', (_, res) => {
    productos.getAll().then((result) => {
        let title = 'Guitarras'
        res.render('productos', { title, result } || { error: "producto no encontrado" })
    })
})

//? API Route ====================================================================================
// Index
api.get('/', (_, res) => {
    const title = 'Guitarras'
    productos.getAll()
        .then(productsAll => res.render('index', { title, option, productsAll }) ||
            { error: 'no se econtraron los productos' })
})

api.get('/api/productos/:id', async (req, res) => {
    const { id } = req.params
    const result = await productos.getById(Number(id))
    res.send(result ||
        { error: "producto no encontrado" })
})

// Nuevo
api.post('/api/productos', (req, res) => {
    const nuevoProd = req.body
    productos.save(nuevoProd)
    res.redirect('/')
})
// Modificar
api.put('/api/productos/:id', (req, res) => {
    //console.log(req.body)
    productos.modifyById(req.body)
    res.redirect('/')
})

api.delete('/api/productos/:id', async (req, res) => {
    const { id } = req.params
    const msj = await productos.deleteById(Number(id))
    res.send(msj || { error: 'producto no encontrado' })
})

export default api