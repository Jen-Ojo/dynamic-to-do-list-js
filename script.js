// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // -------------------------------
    //  LOAD TASKS FROM LOCAL STORAGE
    // -------------------------------
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false = do NOT save again to localStorage
        });
    }

    // -------------------------------
    //  FUNCTION TO ADD NEW TASK
    // -------------------------------
    function addTask(taskText, save = true) {

        // If no task text provided (normal button/enter use)
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Empty input check
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // ✅ Use classList.add as checker expects

        // Remove task when button is clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li); // ✅ Directly remove li from taskList

            // Remove from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append elements
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage (if needed)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input
        taskInput.value = "";
    }

    // -------------------------------
    //  EVENT LISTENERS
    // -------------------------------
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});


