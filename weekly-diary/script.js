const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const daySelect = document.getElementById('day-select'); 


let diary = JSON.parse(localStorage.getItem('diary')) || {};

function saveDiary() {
    localStorage.setItem('diary', JSON.stringify(diary));
}

function renderTasks(day){
    taskList.innerHTML='';
    const tasks = diary[day] || [];
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.achieved) li.classList.add('achieved');

        const icon = task.achieved ? '✅' : '✔';

        li.innerHTML= `
            <span>${task.text}</span>
            <div>
                <button class="check-btn " onclick="toggleAchieved('${day}', ${index})" aria-label="Mark as achieved">${icon}</button>
                <button class="delete-btn" onclick="deleteTask('${day}', ${index})" aria-label="Delete task">🗑</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const day = daySelect.value;
    const text = taskInput.value.trim();
    if (!text) return;

    if (!diary[day]) diary[day] = []

    diary[day].push({ text, achieved: false });

    saveDiary();
    taskInput.value = '';
    renderTasks(day);
}
function toggleAchieved(day, index){
    diary[day][index].achieved = !diary[day][index].achieved;
    saveDiary();
    renderTasks(day);
}

function deleteTask(day, index) {
    diary[day].splice(index, 1);
    saveDiary();
    renderTasks(day);
}

addTaskBtn.addEventListener('click', addTask);
daySelect.addEventListener('change', () => renderTasks(daySelect.value));

// Initial render
renderTasks(daySelect.value);
 
