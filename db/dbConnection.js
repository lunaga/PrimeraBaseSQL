import knex from "knex";
import { DBCreator } from "./dbCreator.js";

export const mysql = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
})

export const sqlite3 = knex({
    client: 'sqlite3',
    connection: { filename: './ecommerce/db.sqlite3' },
    useNullAsDefault: true
})

export const mysqlCreate = new DBCreator(mysql, 'productos')
export const sqlite3Create = new DBCreator(sqlite3, 'mensajes')

