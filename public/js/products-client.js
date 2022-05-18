//# Lista de Productos
import socket from "./socket-client.js";

socket.on('productos', data => {
    if (data === 'reload') {
        let list = document.getElementById('product-list')
        setTimeout(() => {
            fetch('./docs/productos.txt')
                .then((res) => { return res.json() })
                .then(lista => {
                    list.innerHTML = ''

                    let struct = lista.map(prod => {
                        return (`
                    <div class=" flex w-full h-24 m-1 p-2 bg-zinc-700 rounded" style="place-items: center">
                        <div class="w-8 mr-2 text-center font-bold">${prod.id}</div>
                        <div class="w-3/4">${prod.title}</div>
                        <div class="w-20 text-center">${prod.price}</div>
                        <div class="w-48 flex justify-center bg-black"><img alt="image" class="h-20" style="max-width: 13em; object-fit: contain" onerror="this.src='https://i.pinimg.com/originals/f4/9d/0b/f49d0bc00e44cb196068b635e530f340.jpg'" src=${prod.thumbail}></div>
                    </div>
                            `)
                    }).join('')
                    list.innerHTML = struct
                })
                .catch((err) => console.log('Error: ', err))
        }, 500)
    }
})