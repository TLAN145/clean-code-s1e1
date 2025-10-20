//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

// Simple Todo App interactions
// Event handling / user interaction drives code execution.

var taskInput = document.getElementById("new-task"); // Add a new task.
var addButton = document.getElementById("add-button"); // add button
var todoList = document.getElementById("todo-list"); // ul of todo (previously incompleteTasks)
var completedList = document.getElementById("completed-list"); // completed list (previously completed-tasks)

// Create a new task <li> with the necessary controls
var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li");

    // input (checkbox)
    var checkBox = document.createElement("input");
    // label
    var label = document.createElement("label");
    // input (text)
    var editInput = document.createElement("input");
    // button.edit
    var editButton = document.createElement("button");
    // button.delete
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = 'task';

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";

    editButton.innerText = "Edit";
    editButton.className = "edit";

    deleteButton.className = "delete";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = "delete";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

var addTask = function () {
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    todoList.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};

// Edit an existing task
var editTask = function () {
    console.log("Edit Task...");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        // Save changes from input back to label
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        // Enter edit mode: put label text into input
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

// Delete task
var deleteTask = function () {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    if (ul) {
        ul.removeChild(listItem);
    }
};

// Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");
    var listItem = this.parentNode;
    completedList.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

// Mark task incomplete
var taskIncomplete = function () {
    console.log("Incomplete Task...");
    var listItem = this.parentNode;
    todoList.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
    console.log("AJAX Request");
};

// Wire up add button only once
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// Bind events to a task list item
var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    if (editButton) editButton.onclick = editTask;
    if (deleteButton) deleteButton.onclick = deleteTask;
    if (checkBox) checkBox.onchange = checkBoxEventHandler;
};

// Initial binding for current items in todo list
for (var i = 0; i < todoList.children.length; i++) {
    bindTaskEvents(todoList.children[i], taskCompleted);
}

// Initial binding for current items in completed list
for (var j = 0; j < completedList.children.length; j++) {
    bindTaskEvents(completedList.children[j], taskIncomplete);
}



// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.


//Change edit to save when you are in edit mode.
