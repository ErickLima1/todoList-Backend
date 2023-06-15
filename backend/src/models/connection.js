//Carregando Modulo
const mysql = require('mysql2/promise');

//importar
require('dotenv').config();

console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.DB);


//Criando Objeto com modules
const connection = mysql.createPool( {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});


//Exportando Modulo 
module.exports = connection;