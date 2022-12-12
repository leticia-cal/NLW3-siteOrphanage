import { Database } from 'sqlite-async'; //importar dependencia

function execute(db){
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat TEXT,
            lng TEXT,
            name TEXT,
            about TEXT,
            whatsapp TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends TEXT
        );
    `)
};

export default Database.open('src/database/database.sqlite').then(execute); //retorna o db

/* Não usa mais o module.exports por conta do type: module no package.json
module.exports = Database.open('src/database/database.sqlite').then(execute)
*/

