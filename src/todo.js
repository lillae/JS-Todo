'use strict';

const dateBox = document.querySelector('.date');
const addBtn = document.querySelector('.add');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const addTaskBtn = document.querySelector('.addTaskBtn');
const timeInput = document.querySelector('#appt');
const todoContent = document.querySelector('.todo-content');
let pending = document.querySelector('.pending');
let modalInput = document.querySelector('.modal-input');
let todos = [];

//* EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', init);
addTaskBtn.addEventListener('click', addTodo);

//* FUNCTIONS */
function updateTaskTime() {
  return timeInput.value;
}

function makeId() {
  return Math.random().toString(36).substr(2, 9);
}

function addTodo() {
  const modalInputValue = modalInput.value;

  if (modalInput.value !== '' && timeInput.value !== '') {
    getStorage();

    todos.push({
      todo: modalInputValue,
      completed: false,
      time: updateTaskTime(),
      id: makeId(),
    });

    setStorage();
    modalInput.value = '';
  }
  renderTodo();
}

function deleteTodo(index) {
  getStorage();
  todos.splice(index, 1);
  setStorage();
  renderTodo();
}

function renderTodo() {
  getStorage();

  let html = '';

  let circle;
  todos.forEach((item, index) => {
    if (item.completed === true) {
      circle = `<i class="fas fa-check-circle circleFull checked"></i>`;
    } else {
      circle = `<i class="far fa-circle circle" ></i>`;
    }

    html += `
    <div class="task" id=${index}>
    <label class="checkbox" for="toggle">
        ${circle} 
        <input type="checkbox" id=${item.id} class='checkbox-input'>
        <span class='${item.completed ? 'completed' : 'task-text'}'task-text">${
      item.todo
    }</span>
    </label>
    <div>
        <span>${item.time}</span>
        <i class="far fa-trash-alt trash" id=${index} onClick='deleteTodo(${index})'></i>
    </div>
</div>
`;
  });

  if (todos !== null) {
    if (todos.length >= 1) {
      pending.innerText = `${todos.length} pending task`;
    } else {
      pending.innerText = 'No pending task';
    }
  }

  todoContent.innerHTML = html;
}

todoContent.addEventListener('click', (e) => {
  getStorage();
  const checkbox = e.target.previousElementSibling.nextElementSibling;

  if (checkbox.checked) {
    const newCheckbox = todos.find((todo) => todo.id === checkbox.id);
    if (newCheckbox.completed) {
      newCheckbox.completed = false;
    } else {
      newCheckbox.completed = true;
    }
  }
  setStorage();
  renderTodo();
});

function checkboxHandler(item) {
  getStorage();

  item.checked ? todos[item].completed : (todos[item].completed = false);
  setStorage();
  renderTodo();
}

function getStorage() {
  let todo = localStorage.getItem('Todos');
  return todo === null ? (todos = []) : (todos = JSON.parse(todo));
}

function setStorage() {
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
  dateBox.insertAdjacentHTML('afterbegin', output);
};

const modalHandler = () => {
  addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
};

function init() {
  renderTodo();
  getCurrentMonth();
  modalHandler();
}
