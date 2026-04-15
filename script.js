function updateTime() {
    const timeEl = document.getElementById('time-remaining');
    const dueDate = new Date("2026-06-01T18:00:00Z"); // Target future date
    const now = new Date();
    const diff = dueDate - now;

    if (diff <= 0) {
        timeEl.textContent = "Due now!";
    } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        
        if (days > 1) {
            timeEl.textContent = `Due in ${days} days`;
        } else if (days === 1) {
            timeEl.textContent = "Due tomorrow";
        } else {
            timeEl.textContent = `Due in ${hours} hours`;
        }
    }
}

document.getElementById('complete-toggle').addEventListener('change', function(e) {
    const title = document.getElementById('todo-title');
    const status = document.getElementById('status-text');
    
    if (e.target.checked) {
        title.classList.add('completed-text');
        status.textContent = "Done";
        status.style.color = "#059669";
    } else {
        title.classList.remove('completed-text');
        status.textContent = "Pending";
        status.style.color = "#d97706";
    }
});

// Run immediately and then every minute
updateTime();
setInterval(updateTime, 60000);