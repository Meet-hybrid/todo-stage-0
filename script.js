let todoData = {
    title: "Stage 1: Interactive Card",
    description: "This is a long description designed to test the expand and collapse behavior of the Stage 1 Todo Card component.",
    priority: "High",
    status: "Pending",
    dueDate: "2026-03-01T18:00:00"
};

// Elements
const viewMode = document.getElementById('view-mode');
const editMode = document.getElementById('edit-mode');
const statusControl = document.getElementById('status-control');
const completeToggle = document.getElementById('complete-toggle');

// Initialize
function init() {
    updateUI();
    setInterval(updateTimeLogic, 30000);
}

function updateUI() {
    document.getElementById('todo-title').textContent = todoData.title;
    document.getElementById('todo-description').textContent = todoData.description;
    document.getElementById('display-priority').textContent = todoData.priority;
    document.getElementById('status-display').textContent = todoData.status;
    statusControl.value = todoData.status;
    completeToggle.checked = todoData.status === "Done";
    
    // Sync Visuals
    const card = document.getElementById('todo-card');
    const indicator = document.getElementById('priority-indicator');
    indicator.className = `priority-accent ${todoData.priority.toLowerCase()}`;
    
    if (todoData.status === "Done") {
        card.classList.add('status-done');
    } else {
        card.classList.remove('status-done');
    }
    
    updateTimeLogic();
}

function updateTimeLogic() {
    const timeDisplay = document.getElementById('time-remaining');
    const overdueBadge = document.getElementById('overdue-badge');
    const card = document.getElementById('todo-card');

    if (todoData.status === "Done") {
        timeDisplay.textContent = "Completed";
        overdueBadge.classList.add('hidden');
        return;
    }

    const now = new Date();
    const due = new Date(todoData.dueDate);
    const diff = due - now;

    if (diff < 0) {
        overdueBadge.classList.remove('hidden');
        card.classList.add('is-overdue');
        timeDisplay.textContent = `Overdue by ${Math.abs(Math.floor(diff / 3600000))} hours`;
    } else {
        overdueBadge.classList.add('hidden');
        card.classList.remove('is-overdue');
        const hours = Math.floor(diff / 3600000);
        timeDisplay.textContent = hours > 24 ? `Due in ${Math.floor(hours/24)} days` : `Due in ${hours} hours`;
    }
}

document.getElementById('edit-btn').addEventListener('click', () => {
    viewMode.classList.add('hidden');
    editMode.classList.remove('hidden');
    // Populate form
    document.getElementById('edit-title').value = todoData.title;
    document.getElementById('edit-description').value = todoData.description;
    document.getElementById('edit-priority').value = todoData.priority;
    document.getElementById('edit-due-date').value = todoData.dueDate;
});

document.getElementById('save-btn').addEventListener('click', () => {
    todoData.title = document.getElementById('edit-title').value;
    todoData.description = document.getElementById('edit-description').value;
    todoData.priority = document.getElementById('edit-priority').value;
    todoData.dueDate = document.getElementById('edit-due-date').value;
    
    viewMode.classList.remove('hidden');
    editMode.classList.add('hidden');
    updateUI();
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    viewMode.classList.remove('hidden');
    editMode.classList.add('hidden');
});

statusControl.addEventListener('change', (e) => {
    todoData.status = e.target.value;
    updateUI();
});

completeToggle.addEventListener('change', (e) => {
    todoData.status = e.target.checked ? "Done" : "Pending";
    updateUI();
});

document.getElementById('expand-toggle').addEventListener('click', function() {
    const section = document.getElementById('todo-description-section');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    section.classList.toggle('collapsed');
    this.textContent = isExpanded ? "Show Description" : "Hide Description";
});

init();