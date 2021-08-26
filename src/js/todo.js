'use strict';

const toggle = document.querySelectorAll('.toggle');
const checked = document.querySelectorAll('.checked');
const taskText = document.querySelectorAll('.task-text');
const todoHeader = document.querySelector('.todo-header');
const dateBox = document.querySelector('.date');
const task = document.querySelectorAll('.task');
const todoContent = document.querySelector('.todo-content');

let isToggled = false;

toggle.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const btnId = e.target.dataset.value;
    if (btn.checked) {
      checked.forEach((check) => {
        if (btnId === check.dataset.value) {
          check.style.opacity = '1';
        }
      });
      taskText.forEach((text) => {
        if (btnId == text.dataset.value) {
          text.style.color = '#a6aac2';
          text.style.textDecoration = 'line-through';
        }
      });
    }
  });
});

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

const taskCount = () => {
  let arrTask = [];
  task.forEach((t) => {
    arrTask.push(t.dataset.value);
  });
  console.log(arrTask);

  let output = `
  <span>${arrTask.length} tasks pending</span>

  `;
  dateBox.insertAdjacentHTML('afterend', output);
};

const init = () => {
  getCurrentMonth();
  taskCount();
};

init();
