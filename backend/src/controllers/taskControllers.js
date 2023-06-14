//Importando a model
const tasksModel = require('../models/tasksModels');

const getAll = async (req, res) => {
    try{
        const tasks = await tasksModel.getAll();
        return res.status(200).json(tasks);

    }catch(error) {
        return res.status(500).json({message: 'Erro Interno do Servidor!'});
    }
};

const crateTasks = async (req, res) => {
    try {
        const createdTask = await tasksModel.crateTasks(req.body);
        // console.log(createdTask);
        return res.status(201).json(createdTask);
        
    }catch(error) {
        // console.log(error);
        return res.status(500).json({message: 'Erro Interno do Servdior!'});
    }
};

const deleteTask = async(req, res) => {
    try {
        const { id } = req.params;
        await tasksModel.deleteTask(id);
        return res.status(204).json({message: 'Deletado Com Sucesso!'});

    }catch(error) {
        return res.status(500).json({message: 'Erro Interno do Servidor!'});
    }

};

const updateTask = async(req, res) => {
    try{
        const {  id} = req.params;
        await tasksModel.updateTask(id, req.body);
        return res.status(204).json();

    }catch(error) {
        console.log(error);
        return res.status(500).json({message: 'Erro Interno do Servidor!'});
    }
}; 

//Exportando objeto
module.exports = {
    getAll,
    crateTasks,
    deleteTask,
    updateTask,

};
