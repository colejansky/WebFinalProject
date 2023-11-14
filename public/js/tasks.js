// on page load load in tasks that have not been deleted
document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  loadTasks();

  // saving task details when submit button is clicked
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values
    const taskName = document.getElementById('taskName').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value;
    const dueTime = document.getElementById('dueTime').value;
    const comments = document.getElementById('comments').value;

    // Create a new task element with Delete Task button
    const taskElement = createTaskElement(taskName, priority, dueDate, dueTime, comments);

    // Add the task element to the task list
    taskList.appendChild(taskElement);

    // Save tasks to localStorage
    saveTasks();

    // Clear the form
    taskForm.reset();
  });

  // Function to create a task element with Delete Task button
  function createTaskElement(taskName, priority, dueDate, dueTime, comments) {
    const taskElement = document.createElement('div');
    taskElement.innerHTML = `
      <p><strong>Task Name:</strong> ${taskName}</p>
      <p><strong>Priority:</strong> ${priority}</p>
      <p><strong>Due Date:</strong> ${dueDate}</p>
      <p><strong>Due Time:</strong> ${dueTime}</p>
      <p><strong>Comments:</strong> ${comments}</p>
      <button onclick="deleteTask(this)">Delete Task</button>
    `;
    return taskElement;
  }

  // Function to delete a task
  window.deleteTask = (button) => {
    const taskElement = button.parentNode;
    taskList.removeChild(taskElement);
    saveTasks();
  };

  // Function to save tasks to localStorage
  function saveTasks() {
    const tasks = Array.from(taskList.children).map(taskElement => taskElement.innerHTML);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks from localStorage
  function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = task;
        taskList.appendChild(taskElement);
      });
    }
  }
});


