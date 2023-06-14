//Importando o module
const app = require('./app.js');
require('dotenv').config();

const PORT = process.env.PORT || 8081;

//Ligando o Servidor
app.listen(PORT,() => {
    console.log(`Servidor Rodando na Porta ${PORT}`);
});