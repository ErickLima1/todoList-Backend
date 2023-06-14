//Carregando Modulos
const express  = require('express');
const taskControllers = require('./controllers/taskControllers');
const taskMiddleware = require('./middleware/tasksMiddleware');

//Criando Objetos com Modules;
const router = express.Router();


//Carregando Todas Rotas
router.get('/tarefas',  taskControllers.getAll);
router.post('/tarefas', taskMiddleware.validateBody, taskControllers.crateTasks);
router.delete('/tarefas/:id', taskControllers.deleteTask);
router.put('/tarefas/:id', taskMiddleware.validateBody, taskMiddleware.validateStatus,taskControllers.updateTask);

//Exports modulo
module.exports = router;