// script.js

// Wait for the HTML document to be fully parsed and loaded
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements per specification
  const addButton = document.getElementById('add-button'); // "Add Task" button
  const taskInput = document.getElementById('task-input'); // input field for tasks
  const taskList = document.getElementById('task-list');   // ul element to hold tasks

  /**
   * addTask
   * - Reads the text from taskInput, validates, creates an <li> with a remove button,
   *   appends it to taskList, and clears the input.
   */
  function addTask() {
    // Retrieve and trim the input value
    const taskText = taskInput.value.trim();

    // If empty, alert the user and do not add an empty task
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create new list item and set its text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create the remove button for this task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When the remove button is clicked, remove the corresponding li from the DOM
    removeBtn.onclick = function () {
      // Remove the list item element
      if (li && li.parentNode === taskList) {
        taskList.removeChild(li);
      }
    };

    // Append the remove button to the li, then the li to the task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
    taskInput.focus();
  }

  // Add click event listener to the Add button
  addButton.addEventListener('click', addTask);

  // Add keypress event listener to allow adding via Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  /*
   * Per your instruction to "Invoke the addTask function on DOMContentLoaded":
   * Calling addTask() immediately on load would normally try to add whatever is
   * inside the input (usually empty) and trigger an alert. To honor the requirement
   * while avoiding an unwanted alert, we only call addTask here if there is
   * non-empty text already in the input (useful if you prefill the input or
   * implement restored drafts later).
   */
  if (taskInput.value && taskInput.value.trim() !== '') {
    addTask();
  }
});
