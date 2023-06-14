//Importando o connection
const connection = require('./connection');


const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;

};

const crateTasks = async (task) => {
    const { titulo } = task;
    const dataUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(titulo, status, crate_at) VALUES (?, ?, ?)';

    const [createdTask] = await connection.execute(query, [titulo, 'Pendente', dataUTC]);
    return {insetId: createdTask.insertId};
};

const deleteTask = async (id) => {
    const [removed] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removed;
};

const updateTask = async(id, task) => {
    const {titulo, crate_at, status} = task;
    const query = 'UPDATE tasks SET titulo = ?, crate_at = ?, status = ? WHERE id = ?';

    const [updatedTask] = await connection.execute(query, [titulo, crate_at, status, id]);
    return updatedTask;

};


//Exporta para usar em outros lugares
module.exports = {
    getAll,
    crateTasks,
    deleteTask,
    updateTask,
};