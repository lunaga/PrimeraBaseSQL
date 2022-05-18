export class msjController {

    constructor(connection, table) {
        this.save = (msj) => {
            connection(table).insert(msj)
                .then(() => { return })
                .catch(err => console.log('no se guardo el msj enviado', err))
        }
        this.loadAll = async () => {
            const all = await connection.from(table).select('*')
            return all
        }
    }
}

export default msjController