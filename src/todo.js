'use strict';

const timeInput = document.querySelector('#appt');
const todoContent = document.querySelector('.todo-content');

//* EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', init);

//* FUNCTIONS */
function updateTaskTime() {
  return timeInput.value;
}

function makeId() {
  return Math.random().toString(36).substr(2, 9);
}

function addTodo() {
  const modalInput = document.querySelector('.modal-input');
  const modalInputValue = modalInput.value;

  if (modalInput.value !== '' && timeInput.value !== '') {
    let todos = getStorage();

    todos.push({
      todo: modalInputValue,
      completed: false,
      time: updateTaskTime(),
      id: makeId(),
    });

    setStorage(todos);
    modalInput.value = '';
  }
  renderTodo();
}

function deleteTodo(index) {
  let todos = getStorage();

  todos.splice(index, 1);
  setStorage(todos);
  renderTodo();
}

function renderTodo() {
  let todos = getStorage();
  let html = '';
  let circle;

  todos.forEach((item, index) => {
    circle = item.completed
        ? `<i class="fas fa-check-circle circleFull checked"></i>`
        : `<i class="far fa-circle circle" ></i>`;

    html += `
      <div class="task" id=${index}>
        <label class="checkbox" for="toggle">
            ${circle} 
            <input type="checkbox" id=${item.id} class='checkbox-input'>
            <span class='${item.completed ? 'completed' : 'task-text'}'>${item.todo}</span>
        </label>
        <div>
            <span>${item.time}</span>
            <i class="far fa-trash-alt trash" id=${index} onClick='deleteTodo(${index})'></i>
        </div>
    </div>`;
  });

  document.querySelector('.pending').innerText = todos.length >= 1 ? `${todos.length} pending task` : 'No pending task';

  todoContent.innerHTML = html;
}

function getStorage() {
  let todo = localStorage.getItem('Todos');
  return todo === null ? [] : JSON.parse(todo);
}

function setStorage(todos) {
  localStorage.setItem('Todos', JSON.stringify(todos));
}

const getCurrentMonth = () => {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.toLocaleString('default', { weekday: 'long' });
  let dayNr = date.getDate();

  switch (dayNr) {
    case dayNr === 1:
      dayNr += 'st';
      break;
    case dayNr === 2:
      dayNr += 'nd';
      break;
    case dayNr === 3:
      dayNr += 'rd';
      break;
    default:
      dayNr += 'th';
  }

  let output = `
    <h2>${day}, ${dayNr}</h2>
    <h3>${month}</h3>
  `;

  document.querySelector('.date').insertAdjacentHTML('afterbegin', output);
};

const modalHandler = () => {
  const modal = document.querySelector('.modal');

  document.querySelector('.add').addEventListener('click', () => {
    modal.style.display = 'block';
  });

  document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
};

function init() {
  document.querySelector('.addTaskBtn').addEventListener('click', addTodo);

  todoContent.addEventListener('click', e => {
    let todos = getStorage();
    const checkbox = e.target.previousElementSibling.nextElementSibling;

    if (checkbox.checked) {
      const newCheckbox = todos.find((todo) => todo.id === checkbox.id);
      newCheckbox.completed = !newCheckbox.completed
    }
    setStorage(todos);
    renderTodo();
  });

  renderTodo();
  getCurrentMonth();
  modalHandler();
}
