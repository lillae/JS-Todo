'use strict';

const toggle = document.querySelectorAll('.toggle');
const checked = document.querySelectorAll('.checked');
const taskText = document.querySelectorAll('.task-text');
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
