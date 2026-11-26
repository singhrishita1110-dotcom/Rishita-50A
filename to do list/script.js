const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        timeStamp.textContent = checkbox.checked
            ? `Created: ${createdTime} | Completed: ${formatTime(new Date())}`
            : `Created: ${createdTime}`;
    });

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    const timeStamp = document.createElement('span');
    timeStamp.className = 'time-stamp';
    const createdTime = formatTime(new Date());
    timeStamp.textContent = `Created: ${createdTime}`;

    const upBtn = document.createElement('button');
    upBtn.className = 'action-btn';
    upBtn.textContent = '▲';
    upBtn.title = 'Move up';
    upBtn.addEventListener('click', () => {
        const prev = li.previousElementSibling;
        if (prev) taskList.insertBefore(li, prev);
    });

    const downBtn = document.createElement('button');
    downBtn.className = 'action-btn';
    downBtn.textContent = '▼';
    downBtn.title = 'Move down';
    downBtn.addEventListener('click', () => {
        const next = li.nextElementSibling;
        if (next) taskList.insertBefore(next, li);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.append(checkbox, span, timeStamp, upBtn, downBtn, deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});
