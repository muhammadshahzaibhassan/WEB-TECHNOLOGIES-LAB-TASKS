let tasks = [];
let currentFilter = "all";


document.addEventListener("DOMContentLoaded", () => {
loadTasks();


document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keydown', e => {
if (e.key === 'Enter') addTask();
});


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
});


function loadTasks() {
tasks = JSON.parse(localStorage.getItem('tasks')) || [];
if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
render();
}
function saveTasks(){ localStorage.setItem('tasks', JSON.stringify(tasks)); }
function saveTheme(){ localStorage.setItem('theme', document.body.classList.contains('dark')?'dark':'light'); }


function render(){
const list = document.getElementById('taskList');
list.innerHTML = '';


let filtered = tasks.filter(t => currentFilter === 'active' ? !t.completed : currentFilter === 'completed' ? t.completed : true);


filtered.forEach(task =>{
const li = document.createElement('li');
if(task.completed) li.classList.add('completed');


const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = task.completed;
checkbox.onclick = () => toggleTask(task.id);


const text = document.createElement('span');
text.textContent = task.text;
text.contentEditable = true;
text.oninput = () => editTask(task.id, text.textContent);


const del = document.createElement('button');
del.textContent = 'X';
del.className = 'delete-btn';
del.onclick = () => deleteTask(task.id);


li.append(checkbox, text, del);
list.append(li);
});
}


function addTask(){
const input = document.getElementById('taskInput');
const text = input.value.trim();
if(!text) return;


tasks.push({ id: Date.now(), text, completed:false });
saveTasks();
render();
input.value = '';
}


function editTask(id,newText){ tasks = tasks.map(t => t.id===id?{...t,text:newText}:t); saveTasks(); }
function deleteTask(id){ tasks = tasks.filter(t => t.id!==id); saveTasks(); render(); }
function toggleTask(id){ tasks = tasks.map(t => t.id===id?{...t,completed:!t.completed}:t); saveTasks(); render(); }