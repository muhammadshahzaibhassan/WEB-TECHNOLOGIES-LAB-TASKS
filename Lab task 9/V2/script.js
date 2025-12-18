let tasks = [];
function saveTheme() { localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light'); }


function render() {
const list = document.getElementById('taskList');
list.innerHTML = '';


let filtered = tasks.filter(t => {
if(currentFilter === 'active') return !t.completed;
if(currentFilter === 'completed') return t.completed;
return true;
});


filtered.forEach(task => {
const li = document.createElement('li');
if (task.completed) li.classList.add('completed');


const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = task.completed;
checkbox.addEventListener('change', () => toggleTask(task.id));


const text = document.createElement('span');
text.textContent = task.text;
text.contentEditable = true;
text.addEventListener('input', () => editTask(task.id, text.textContent));


const delBtn = document.createElement('button');
delBtn.textContent = 'X';
delBtn.className = 'delete-btn';
delBtn.addEventListener('click', () => deleteTask(task.id));


li.appendChild(checkbox);
li.appendChild(text);
li.appendChild(delBtn);
list.appendChild(li);
});
}


function addTask() {
const input = document.getElementById('taskInput');
const text = input.value.trim();
if (!text) return;


tasks.push({ id: Date.now(), text, completed: false });
saveTasks();
render();


input.value = '';
input.focus();
}


function editTask(id, newText) {
tasks = tasks.map(t => t.id === id ? { ...t, text: newText } : t);
saveTasks();
}


function deleteTask(id) {
tasks = tasks.filter(t => t.id !== id);
saveTasks();
render();
}


function toggleTask(id) {
tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
saveTasks();
render();
}


document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });


document.querySelectorAll('.filter').forEach(btn => {
btn.addEventListener('click', () => {
document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
currentFilter = btn.dataset.filter;
render();
});
});


document.getElementById('themeToggle').addEventListener('click', () => {
document.body.classList.toggle('dark');
saveTheme();
});


loadTasks();