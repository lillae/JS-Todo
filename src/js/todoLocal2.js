'use strict';
const LOCAL_STORAGE_TODOS_KEY = 'todos';
const modalCloseButton = document.querySelector('.close')

document.addEventListener('DOMContentLoaded', init);

function init() {
  renderTodos()
  modalHandler();
}

const renderTodos = () => {
  let storedTodos = getTodos();
  let html = ''

  storedTodos.forEach(todo => {
    html += `
          <div class="task"">
            <label class="checkbox" for="toggle">
                <i class="far fa-circle"></i>
                <i class="fas fa-check-circle checked${todo.completed ? ' done' : ''}"></i>
                <input type="checkbox" data-id="${todo.id}">
                <span class="task-text${todo.completed ? ' done' : ''}">${todo.result}</span>
            </label>
            <div>
                <span>${todo.time}</span>
                <i class="far fa-trash-alt trash" data-id="${todo.id}"></i>
            </div>
        </div>
      `
  });

  document.querySelector('.todo-content').innerHTML = html
  setStatusHandler()
  setDeleteHandler()
}

const modalHandler = () => {
  const modal = document.querySelector('.modal');

  document.querySelector('.add').addEventListener('click', () => modal.classList.add('show'))
  modalCloseButton.addEventListener('click', () => modal.classList.remove('show'))
  window.addEventListener('click', e => e.target === modal && modal.classList.remove('show'))
  document.querySelector('.addTaskBtn').addEventListener('click', save)
};

const getTodos = () => {
  let data = localStorage.getItem(LOCAL_STORAGE_TODOS_KEY)
  return data ? JSON.parse(data) : []
}

const setTodos = data => localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(data))
const makeId = () => Math.random().toString(36).substr(2, 9)

const save = () => {
  const result = document.querySelector('.modal-input').value
  const time = document.querySelector('#appt').value
  const id = makeId()

  if (result.length > 0 && time.length > 0) {
    renderTodos(setTodos([...getTodos(), {result, time, id}]))
    modalCloseButton.click()
  }
  else {
    alert('Please fill the form!')
  }
}

const setStatusHandler = () => document.querySelectorAll('input[type="checkbox"]').forEach(v => v.addEventListener('click', statusHandler))
const setDeleteHandler = () => document.querySelectorAll('.trash').forEach(v => v.addEventListener('click', deleteHandler))

const statusHandler = e => {
  if (e.currentTarget.checked) {
    e.currentTarget.previousElementSibling.classList.add('done')
    e.currentTarget.nextElementSibling.classList.add('done')
  }
  else  {
    e.currentTarget.previousElementSibling.classList.remove('done')
    e.currentTarget.nextElementSibling.classList.remove('done')
  }

  let data = getTodos().map(v => {
    if (v.id === e.currentTarget.dataset.id) {
      v.completed = e.currentTarget.checked
    }
    return v
  });

  setTodos(data)
}

const deleteHandler = e => renderTodos(setTodos(getTodos().filter(v => v.id !== e.currentTarget.dataset.id)))
