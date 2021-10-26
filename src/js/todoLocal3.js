'use strict';

const dateBox = document.querySelector('.date');
const addBtn = document.querySelector('.add');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const addTaskBtn = document.querySelector('.addTaskBtn');
const timeInput = document.querySelector('#appt');
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
      id: makeId(),
    });

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
  const todoContent = document.querySelector('.todo-content');

  let circle;
  todos.forEach((item, index) => {
    if (item.completed === true) {
      circle = `<i class="fas fa-check-circle circleFull checked"></i>`;
    } else {
      circle = `<i class="far fa-circle circle" ></i>`;
    }

    html += `
    <div class="task" id=${item.id}>
    <label class="checkbox" for="toggle">
        ${circle} 
        <input type="checkbox" id=${
          item.id
        } onchange="checkboxHandler(${index})">
        <span class='${item.completed ? 'completed' : 'task-text'}'task-text">${
      item.todo
    }</span>
    </label>
    <div>
        <span>${item.time}</span>
        <i class="far fa-trash-alt trash" id=${
          item.id
        } onClick='deleteTodo(${index})'></i>
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

function checkboxHandler(item) {
  console.log(item);
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
  renderTodo();
  getCurrentMonth();
  modalHandler();
}
