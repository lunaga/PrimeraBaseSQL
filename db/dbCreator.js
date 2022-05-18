export class DBCreator {
    constructor(connection, tablename) {
        this.createDB = async () => {

            if (tablename === 'productos') {

                connection.schema.createTable(tablename, (table) => {
                    table.string('title')
                    table.float('price')
                    table.string('thumbail')
                    table.increments('id')
                })
                    .then(() => console.log('tabla en productos creada'))
                    .catch((error) => console.log('tabla en productos (mysql) ya existente'))
                //.finally(() => { connection.destroy() })
            }


            if (tablename === 'mensajes') {

                connection.schema.createTable(tablename, table => {
                    table.string('mail')
                    table.string('msj')
                    table.timestamp('time').defaultTo(connection.fn.now())
                })
                    .then((res) => console.log('tabla creada', res))
                    .catch((error) => console.log('tabla en mensajes (sqlite3) ya existente'))
                //.finally(() => { connection.destroy() })
            }
        }
    }
}

