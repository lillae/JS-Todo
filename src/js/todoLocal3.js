'use strict';

const dateBox = document.querySelector('.date');
const addBtn = document.querySelector('.add');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const addTaskBtn = document.querySelector('.addTaskBtn');
const todoHeader = document.querySelector('.todo-header');
const todoContent = document.querySelector('.todo-content');
const timeInput = document.getElementById('appt');
let pending = document.querySelector('.pending');
let modalInput = document.querySelector('.modal-input');
let time;
let todos = [];

//* EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', init);
addTaskBtn.addEventListener('click', addTodo);

//* FUNCTIONS */
function updateTaskTime() {
  let addedTime = timeInput.value;
  return addedTime;
}

function addTodo() {
  const modalInputValue = modalInput.value;

  if (modalInputValue.trim() !== 0) {
    let todo = localStorage.getItem('Todos');

    if (todo === null) {
      todos = [];
    } else {
      todos = JSON.parse(todo);
    }

    todos.push({
      todo: modalInputValue,
      completed: false,
      time: updateTaskTime(),
    });

    console.log(todos);
    localStorage.setItem('Todos', JSON.stringify(todos));
    modalInput.value = '';
  }
  renderTodo();
}

function deleteTodo(index) {
  let todo = localStorage.getItem('Todos');
  let todos = JSON.parse(todo);
  todos.splice(index, 1);
  localStorage.setItem('Todos', JSON.stringify(todos));
  renderTodo();
}

function renderTodo() {
  let todo = localStorage.getItem('Todos');

  if (todo === null) {
    todos = [];
  } else {
    todos = JSON.parse(todo);
  }

  let html = '';
  let todoContent = document.querySelector('.todo-content');

  todos.forEach((item, index) => {
    html += `
    <div class="task" id=${index}>
    <label class="checkbox" for="toggle">
        <i class="far fa-circle circle" ></i>
        <i class="fas fa-check-circle circleFull checked${
          item.completed ? ' done' : ''
        }"></i>
        <input type="checkbox" id=${index}">
        <span class="task-text ${item.completed ? 'completed' : ''}">${
      item.todo
    }</span>
    </label>
    <div>
        <span>${item.time}</span>
        <i class="far fa-trash-alt trash" onClick='deleteTodo(${index})'></i>
    </div>
</div>
`;

    if (todos !== null) {
      pending.innerText = `${todos.length} pending tasks`;
    }

    todoContent.innerHTML = html;
  });
}

const getCurrentMonth = () => {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.toLocaleString('default', { weekday: 'long' });
  let dayNr = date.getDate();

  if (dayNr >= 4) {
    dayNr += 'th';
  } else if (dayNr === 1) {
    dayNr += 'st';
  } else if (dayNr === 2) {
    dayNr += 'nd';
  } else if (dayNr === 3) {
    dayNr += 'rd';
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
  getCurrentMonth();
  modalHandler();
  renderTodo();
}
