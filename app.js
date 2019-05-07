/*Items stay in the task area after page is re-loaded b/c the item are (stored) persisted from local storage */

//Define our UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection'); //ul
const clearBtn = document.querySelector('.clear-tasks'); //black clear button
const filter = document.querySelector('#filter'); //filter tasks input section
const taskInput = document.querySelector('#task'); //add task button

//load all event listeners
loadEventListeners();

//load all event listeners function
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks); //DOMContentLoaded is an event that gets called right after the DOM is loaded
  //add task event
  form.addEventListener('submit', addTask); //addTask will be a function
  //remove task event
  taskList.addEventListener('click', removeTask); //removeTask function is on line 53
  //clear tasks
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LS
function getTasks() {
  let tasks; //initialize task
  if (localStorage.getItem('tasks') === null) {
    //check to see if there's anything there
    tasks = []; //if there isn't set it to an empty array
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //if there is set it to whatever is there
  }

  //loop through the tasks that are there
  tasks.forEach(function(task) {
    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item'; //class name comes from materialize CSS framework
    //create text node and append to li
    li.appendChild(document.createTextNode(task)); //inside createTextNode is whatever (taskInput.value) is passed into the input to be the text node

    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content'; //class names are part of materialize CSS framework

    //add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
  });
}

//add task function - will take event (e) object
//if taskInput value is = to (empty) nothing, then trigger alert (line21&22)
//if taskInput is filled, then create li (line26)
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  //create li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item'; //class name comes from materialize CSS framework
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value)); //inside createTextNode is whatever (taskInput.value) is passed into the input to be the text node

  //create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content'; //class names are part of materialize CSS framework

  //add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //Store in LS
  storeTaskInLocalStorage(taskInput.value); // whatever gets passed into new task input will get passed

  //clears 'new task' input
  taskInput.value = '';

  e.preventDefault();
}

//store task function
function storeTaskInLocalStorage(task) {
  let tasks;
  //checking if there's something in local storage in if below
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task); //pushing task val to tasks val

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task function - target delete item w/ delegation
//line 56&58 - if a tag contains 'delete-item' class then remove li when clicked (removeTask has event listener of click) on x icon
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove(); //removes the whole li from the lu, b/c we traveled 1 parent above from the a tag. 1st parentElement starts at a tag and next to us to li.

      //remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from LS function
function removeTaskFromLocalStorage(taskItem) {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function for clearTask
//firstChild - gets 1st child of task, saying while there's a first child. Is there still something in the list
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //clear button
  clearTasksFromLocalStorage();
}

//clear from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter Tasks
//we can use a forEach b/c querySelectorAll returns a node list
function filterTasks(e) {
  const text = e.target.value.toLowerCase(); //toLowerCase so we can match it correctly

  //getting all list items(line81) and loop through them (forEach)
  //line 84 - if item (lower case) the text (e.target.value) being passed to indexOf, if not equal to -1 then display block
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
