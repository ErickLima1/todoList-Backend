//Carregando Modulo
const mysql = require('mysql2/promise');

//importar
require('dotenv').config();

// console.log(process.env.MYSQL_HOST);
// console.log(process.env.MYSQL_USER);
// console.log(process.env.MYSQL_PASSWORD);
// console.log(process.env.DB);


//Criando Objeto com modules
const connection = mysql.createPool(process.env.DATABASE_URL);
console.log('Connected to PlanetScale!');
//Exportando Modulo 
module.exports = connection;