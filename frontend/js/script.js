const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');
//http://localhost:3031/tarefas
const fetchTasks = async () => {
    const respose = await fetch('https://todo-list-backend-psi.vercel.app');
    const task = await respose.json();
    return task
}


const addTask = async (event) => {
    event.preventDefault();
    const task = {titulo: inputTask.value };

    await fetch('https://todo-list-backend-psi.vercel.app/tarefas', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    });
    loadTasks();
    inputTask.value = '';
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3031/tarefas/${id}`, {
        method: 'delete',
    });
    alert('deletando');
    loadTasks();
}

const updateTask = async ({id, titulo, crate_at, status}) => {
    
    await fetch(`http://localhost:3031/tarefas/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ titulo, crate_at, status })
    });
    
    loadTasks();
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if(innerText) {
        element.innerText = innerText;

    }
    if(innerHTML) {
        element.innerHTML = innerHTML;

    }

    return element;
}

const createSelect = (value) => {
    const options = `
        <option value="Pendente">Pendente</option>
        <option value="em Andamento">em Andamento</option>
        <option value="concluida">concluida</option>
    `;
    const select = createElement('select', '', options);

    select.value = value;
    
    return select;
}

const formatDate = (dateUTC) => {
    const option = { dateStyle: 'long', timeStyle: 'short'};
    const date = new Date(dateUTC).toLocaleString('pt-BR', option);
    return date; 
}


const createRow = (task) => {
    const {id, titulo, crate_at, status} = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', titulo);
    const tdCreatedAt = createElement('td', formatDate(crate_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);
    select.addEventListener('change', ({ target }) => updateTask({  ...task, status:target.value }));

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = titulo;
    editForm.appendChild(editInput);
    
    //parou aqui !
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newCrateAt = new Date().toISOString();
    
        await updateTask({ id, titulo: editInput.value, crate_at: newCrateAt, status });
    
        tdTitle.innerText = editInput.value;
        tdCreatedAt.innerText = formatDate(newCrateAt);
    
        alert('Tarefa Modificada');
        // console.log(tdCreatedAt);
    });
    
    editButton.addEventListener('click', () =>  {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
        
    });

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');
    select.classList.add('select-event');

    deleteButton.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select);

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);



    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    
    return tr;
    
    // console.log(tbody);
}

const loadTasks  = async () => {
    const task = await fetchTasks(); 
    tbody.innerHTML = '';

    task.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
    
}

addForm.addEventListener('submit', addTask);

loadTasks();

