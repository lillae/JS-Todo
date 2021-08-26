'use strict';

const toggle = document.querySelectorAll('.toggle');
const checked = document.querySelectorAll('.checked');
const taskText = document.querySelectorAll('.task-text');
const todoHeader = document.querySelector('.todo-header');

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
  const dayNr = date.getDate() + `th`;

  let output = `
  <div class="date">
    <h2>${day}, ${dayNr}</h2>
    <h3>${month}</h3>
  </div>
  `;
  todoHeader.insertAdjacentHTML('afterbegin', output);
};

getCurrentMonth();
