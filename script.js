document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        storedTasks.forEach(function (taskText) {
            addTask(taskText, false);
        });
    }

    // Function to add a new task
    function addTask(taskText, save = true) {

        // If called from button or Enter key, get text from input
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        if (taskText !== "") {
            // Create new li element
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.className = 'remove-btn';

            // Assign onclick event
            removeBtn.onclick = function () {
                taskList.removeChild(li);

                // Update Local Storage when task is removed
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const updatedTasks = storedTasks.filter(function (task) {
                    return task !== taskText;
                });
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            };

            // Append button to li, and li to list
            li.appendChild(removeBtn);
            taskList.appendChild(li);

            // Save new task to Local Storage
            if (save) {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks.push(taskText);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }

            // Clear input field
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when page loads
    loadTasks();

});


