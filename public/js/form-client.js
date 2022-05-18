//# Form
import socket from "./socket-client.js";

let option
// RECIBO
socket.on('input-res', data => {
    option = data
})

// FUNCIONES

let ingresarBtn = document.getElementById('ingresar')
let modificarBtn = document.getElementById('modificar')

// Cambio de menú
ingresarBtn.onclick = () => ingresar()
modificarBtn.onclick = () => modificar()

function ingresar() {
    if (!option) {
        option = true
        socket.emit('input-req', option)
        location.reload()
    }
}
function modificar() {
    if (option) {
        option = false
        socket.emit('input-req', option)
        location.reload()
    }
}

// Formulario de Producto: No recargar
let productForm = document.getElementById('productForm')
productForm.onsubmit = prevent.bind()

function prevent() {
    //e.preventDefault()
    socket.emit('quest', 'ok')
}

