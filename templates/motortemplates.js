// Importar Handlebars
import handlebars from 'express-handlebars'

export function motortemplates(app) {

    // Configuracion Motor de Plantilla
    app.engine('hbs', handlebars.engine(
        {
            extname: 'hbs',
            defaultLayout: 'mainLayout.hbs',
            layoutsDir: './templates/views/layouts',
            partialsDir: './templates/views/partials'
        }
    ))
    // Entorno de Motor de Plantilla
    app.set('view engine', 'hbs')
    app.set('views', './templates/views/pages')

}