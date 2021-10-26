const darkToggle = document.querySelector('#dark-toggle');
const bodyEl = document.querySelector('body');

const darkMode = () => {
  bodyEl.classList.toggle('dark');
};

darkToggle.addEventListener('click', () => {
  setDarkMode = localStorage.getItem('dark');
  if (setDarkMode !== 'on') {
    darkMode();
    setDarkMode = localStorage.setItem('dark', 'on');
  } else {
    darkMode();
    setDarkMode = localStorage.setItem('dark', null);
  }
});

let setDarkMode = localStorage.getItem('dark');
if (setDarkMode === 'on') {
  darkMode();
}
