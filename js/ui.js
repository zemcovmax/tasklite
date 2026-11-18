'use strict';

const STORAGE_KEY = 'tasklite_tasks';
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

function loadTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(text) {
    const tasks = loadTasks();
    tasks.push({ id: Date.now().toString(), text, done: false });
    saveTasks(tasks);
    return tasks;
}

function toggleTask(id) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.done = !task.done;
        saveTasks(tasks);
    }
    return tasks;
}

function render() {
    list.innerHTML = '';
    const tasks = loadTasks();

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';
        li.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => {
            toggleTask(task.id);
            render();
        });

        const span = document.createElement('span');
        span.textContent = task.text;

        li.appendChild(checkbox);
        li.appendChild(span);
        list.appendChild(li);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        addTask(text);
        input.value = '';
        render();
    }
});

// Запускаем отрисовку при открытии страницы
render();