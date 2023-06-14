//Carregando Modulos
const express  = require('express');
const cors = require('cors');
//Importando router
const router = require('./router');

//Criando Objetos com Modules;
const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

//Exports modulo;
module.exports = app;
