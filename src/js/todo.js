'use strict';

const toggle = document.querySelectorAll('.toggle');
const todoHeader = document.querySelector('.todo-header');
const dateBox = document.querySelector('.date');
const task = document.querySelectorAll('.task');
const todoContent = document.querySelector('.todo-content');
const modal = document.querySelector('.modal');
const addBtn = document.querySelector('.add');
const closeBtn = document.querySelector('.close');
const addTaskBtn = document.querySelector('.addTaskBtn');
const modalInput = document.querySelector('.modal-input');
const timeInput = document.getElementById('appt');
const deleteBtn = document.querySelectorAll('.trash');
let arrTask = [];
let num = 0;
let result;
let time;
let todo;

//* Event listeners */

addTaskBtn.addEventListener('click', renderTodo);

deleteBtn.forEach(() => {
  todoContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('trash')) {
      e.target.parentElement.parentElement.remove();
    }
  });
});

toggle.forEach(() => {
  todoContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle')) {
      e.target.previousElementSibling.style.opacity = '1';
      e.target.nextElementSibling.style.color = '#a6aac2';
      e.target.nextElementSibling.style.textDecoration = 'line-through';
    }
  });
});

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

function renderTodo() {
  result = updateInput();
  time = updateTaskTime();
  todo = { result, time, num };
  arrTask.push(todo);
  console.log(arrTask);
  num += 1;

  //*Outputting Task
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
    checkbox.classList.add('toggle');
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
    modal.style.display = 'none';
  }

  modalInput.value = '';
  timeInput.value = '';
}

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

// function saveTodos(todo) {
//   let todos;
//   if (localStorage.getItem('todos') === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem('todos'));
//   }
//   todos.push(todo);
//   localStorage.setItem('todos', JSON.stringify(todos));
// }

// const taskCount = (todo) => {
//   todo.forEach((t) => {
//     arrTask.push(t);
//   });

//   let output = `
//   <span>${arrTask.length} task pending</span>
//   `;

//   dateBox.insertAdjacentHTML('afterend', output);
// };
