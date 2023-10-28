document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    // Function to create a new task
    function createTask(taskText) {
        const task = {
            text: taskText,
            completed: false
        };
        savedTasks.push(task);
        saveTasks();
        return task;
    }

    // Function to render the tasks
    function renderTasks() {
        taskList.innerHTML = "";
        savedTasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            const deleteButton = document.createElement("button");

            listItem.innerHTML = `
                <span>${task.text}</span>
                <button class="delete">Delete</button>
            `;

            if (task.completed) {
                listItem.classList.add("completed");
            }

            deleteButton.addEventListener("click", () => {
                savedTasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            listItem.addEventListener("click", () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            taskList.appendChild(listItem);
            listItem.appendChild(deleteButton);
        });
    }

    renderTasks();

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            return; // Ignore empty tasks
        }

        createTask(taskText);
        taskInput.value = "";
        renderTasks();
    });
});
