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
  //remove task event
  taskList.addEventListener('click', removeTask); //removeTask function is on line 53
  //clear tasks
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks event
  filter.addEventListener('keyup', filterTasks);
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

  //clears 'new task' input
  taskInput.value = '';

  e.preventDefault();
}

//remove task function - target delete item w/ delegation
//line 56&58 - if a tag contains 'delete-item' class then remove li when clicked (removeTask has event listener of click) on x icon
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove(); //removes the whole li from the lu, b/c we traveled 1 parent above from the a tag. 1st parentElement starts at a tag and next to us to li.
    }
  }
}

//function for clearTask
//firstChild - gets 1st child of task, saying while there's a first child. Is there still something in the list
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//filter Tasks
//we can use a forEach b/c querySelectorAll returns a node list
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
