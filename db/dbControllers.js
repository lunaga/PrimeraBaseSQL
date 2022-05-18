export class dbController {

    constructor(connection, table) {

        this.save = (article) => {
            connection(table).insert(article)
                .then(() => console.log('articulo ingresado'))
                .catch(err => console.log('hubo un error', err))
            //.finally(() => { connection.destroy() })
        }

        this.getAll = async () => {
            const all = await connection.from(table).select('*')
            return all
        }

        this.getById = async (id) => {
            const byId = await connection.from(table).select('title', 'price', 'thumbail').where({ id: id })
            return byId
        }

        this.modifyById = async (product) => {
            await connection(table).where({ id: product.id }).update({ title: product.title, price: product.price, thumbail: product.thumbail })
            return 'Producto modificado'
        }

        this.deleteById = async (id) => {
            await connection(table).where({ id: id }).del()
            return 'Producto borrado'
        }

        this.deleteAll = async () => {
            await connection(table).del()
            return 'Todos los productos borrados'
        }
    }
}

export default dbController
