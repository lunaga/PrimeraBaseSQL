//# Chat
import socket from "./socket-client.js";

let mensajes = document.getElementById('mensajes')

//? Socket
socket.on('messages', data => {
    render(data)
})

const render = (data) => {
    let chat = data.map((msj) => {
        return (`<b class="text-red-700" style="scroll-snap-align: end">${msj.mail}</b>
                <span class="text-green-600">${msj.time} :</span>
                <i class="text-black">${msj.msj}</i><br>`)
    }).join(" ")
    mensajes.innerHTML = chat
}

//? Submit Action
let chat = document.getElementById('chat')
chat.onsubmit = addMessage.bind()

function addMessage(e) {

    e.preventDefault()
    let tempMail = document.getElementById('username').value
    let tempMessage = document.getElementById('message').value
    if ((tempMail !== '') && (tempMessage !== '')) {
        let mensaje = {
            mail: tempMail,
            msj: tempMessage,
            time: `${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`
        }
        socket.emit('new-message', mensaje)
        document.getElementById('message').value = ''
        document.getElementById('mensajes').scrollTo({ behavior: "smooth", top: 9999999 })
    }
}