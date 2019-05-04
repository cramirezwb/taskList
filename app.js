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
  //add task event
  form.addEventListener('submit', addTask); //addTask will be a function
}

//add task function - will take event (e) object
//if taskInput value is = to (empty) nothing, then trigger alert (line20)
//if taskInput is filled, then create li
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

  //clears 'new task' input
  taskInput.value = '';
  e.preventDefault();
}
