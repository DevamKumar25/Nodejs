const fs = require("fs");
const filePath = "./tasks.json";

// Load tasks from file
const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    // Return empty list if file doesn't exist or invalid JSON
    return [];
  }
};

// Save tasks to file
const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(filePath, dataJSON);
};

// Add a new task
const addTask = (task) => {
  if (!task) {
    console.log("Please provide a task to add.");
    return;
  }

  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Task added:", task);
};

// List all tasks
const listTasks = () => {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
  }
};

// Remove a task by index
const removeTask = (index) => {
  const tasks = loadTasks();
  if (isNaN(index) || index < 1 || index > tasks.length) {
    console.log("Invalid task number.");
    return;
  }

  const removedTask = tasks.splice(index - 1, 1);
  saveTasks(tasks);
  console.log("Task removed:", removedTask[0].task);
};

// Command-line argument handling
//process.argv is an array that holds all the arguments passed to the script when it is run through the command line.

const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
  case "add":
    addTask(argument);
    break;
  case "list":
    listTasks();
    break;
  case "remove":
    removeTask(parseInt(argument));
    break;
  default:
    console.log("Command not found! Use 'add', 'list', or 'remove'.");
}
