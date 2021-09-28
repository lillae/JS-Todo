'use strict';

const todoHeader = document.querySelector('.todo-header');
const dateBox = document.querySelector('.date');
const todoContent = document.querySelector('.todo-content');
const modal = document.querySelector('.modal');
const addBtn = document.querySelector('.add');
const closeBtn = document.querySelector('.close');
const addTaskBtn = document.querySelector('.addTaskBtn');
const modalInput = document.querySelector('.modal-input');
const timeInput = document.getElementById('appt');
const pending = document.querySelector('.pending');

let arrTask = [];

let num = 0;
let result;
let time;
let todo;

addTaskBtn.addEventListener('click', renderTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//*Functions */

function updateInput() {
  let addedTask = modalInput.value;
  return addedTask;
}

function updateTaskTime() {
  let addedTime = timeInput.value;
  return addedTime;
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

function taskCounter() {
  pending.innerText = `${arrTask.length} pending tasks`;
}

function deleteTodo(e) {
  const item = e.target;
}

function renderTodo() {
  result = updateInput();
  time = updateTaskTime();
  const todo = { result, time, num };
  arrTask.push(todo);
  console.log(arrTask);
  taskCounter();
  num += 1;
  saveTodos(todo);

  if (modalInput.value !== '' && timeInput.value !== '') {
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('data-value', `${num}`);
    todoContent.appendChild(task);

    const label = document.createElement('label');
    label.classList.add('checkbox');
    label.setAttribute('for', 'toggle');
    task.appendChild(label);

    const circle = document.createElement('i');
    circle.classList.add('far');
    circle.classList.add('fa-circle');
    label.appendChild(circle);

    const circleFull = document.createElement('i');
    circleFull.classList.add('fas');
    circleFull.classList.add('fa-check-circle');
    circleFull.classList.add('checked');
    circleFull.setAttribute('data-value', `${num}`);
    label.appendChild(circleFull);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-value', `${num}`);
    label.appendChild(checkbox);

    const span = document.createElement('span');
    span.classList.add('task-text');
    span.setAttribute('data-value', `${num}`);
    span.textContent = `${result}`;
    label.appendChild(span);

    const timeDiv = document.createElement('div');
    task.appendChild(timeDiv);

    const timeSpan = document.createElement('span');
    timeSpan.textContent = `${time}`;
    timeDiv.appendChild(timeSpan);

    const trash = document.createElement('i');
    trash.classList.add('far');
    trash.classList.add('fa-trash-alt');
    trash.classList.add('trash');
    timeDiv.appendChild(trash);

    trash.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
    });

    checkbox.addEventListener('click', () => {
      if (checkbox.checked) {
        circleFull.style.opacity = '0';
        span.style.color = '#71789c';
        span.style.textDecoration = 'none';
      } else {
        circleFull.style.opacity = '1';
        span.style.color = '#a6aac2';
        span.style.textDecoration = 'line-through';
      }
    });
  }

  modalInput.value = '';
}

//* Functions for LocalStorage */

function saveTodos(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('data-value', `${num}`);
    todoContent.appendChild(task);

    const label = document.createElement('label');
    label.classList.add('checkbox');
    label.setAttribute('for', 'toggle');
    task.appendChild(label);

    const circle = document.createElement('i');
    circle.classList.add('far');
    circle.classList.add('fa-circle');
    label.appendChild(circle);

    const circleFull = document.createElement('i');
    circleFull.classList.add('fas');
    circleFull.classList.add('fa-check-circle');
    circleFull.classList.add('checked');
    circleFull.setAttribute('data-value', `${num}`);
    label.appendChild(circleFull);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-value', `${num}`);
    label.appendChild(checkbox);

    const span = document.createElement('span');
    span.classList.add('task-text');
    span.setAttribute('data-value', `${num}`);
    span.textContent = todo.result;
    label.appendChild(span);

    const timeDiv = document.createElement('div');
    task.appendChild(timeDiv);

    const timeSpan = document.createElement('span');
    timeSpan.textContent = todo.time;
    timeDiv.appendChild(timeSpan);

    const trash = document.createElement('i');
    trash.classList.add('far');
    trash.classList.add('fa-trash-alt');
    trash.classList.add('trash');
    timeDiv.appendChild(trash);
    modal.style.display = 'none';

    trash.addEventListener('click', (e) => {
      const taskItem = e.target.parentElement.parentElement;
      taskItem.remove();
      let index = arrTask.indexOf(this);
      arrTask.splice(index, 1);
      removeLocalTodo(taskItem);
      pending.innerText = `${arrTask.length} pending task`;
    });

    checkbox.addEventListener('click', () => {
      if (checkbox.checked) {
        circleFull.style.opacity = '0';
        span.style.color = '#71789c';
        span.style.textDecoration = 'none';
      } else {
        circleFull.style.opacity = '1';
        span.style.color = '#a6aac2';
        span.style.textDecoration = 'line-through';
      }
    });
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].children[3];
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// function displayTodos() {
//   const todoStorage = JSON.parse(localStorage.getItem('TODO-app')) || [];

//   todoStorage.forEach((todo) => {
//     const userItem = `
//     <div class="task">
//       <label for="" class="checkbox">
//         <input type="checkbox" class="toggle">
//         <i class="far fa-circle"></i>
//         <i class="fas fa-check-circle checked"></i>
//         <span class="task-text">${todo.result}</span>
//       </label>
//       <div>
//         <span>${todo.time}</span>
//         <i class="far fa-trash-alt"></i>
//       </div>
//     </div>`;
//     todoContent.insertAdjacentHTML('beforeend', userItem);
//   });
// }

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
}

init();
