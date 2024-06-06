/*-------------------------SELECTORS-------------------------*/
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

/*-------------------------EVENT LISTENERS-------------------------*/

//Attach event listener to the document/window to execute the getTodos()
document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrCheck);
filterOption.addEventListener("click", filterTodo);

/*-------------------------FUNCTIONS-------------------------*/

function addTodo(event) {
  //Prevent default reloading/rendering
  event.preventDefault();

  //Creating ToDo div, which is a container that will hold the elements/todos/tasks added
  const todoDiv = document.createElement("div");
  //Add class name
  todoDiv.classList.add("todo");

  //Create <li>, this is each task/todo individually which is contained in the todoDiv container created above
  const newTodo = document.createElement("li");
  //Value for the todo item/ <li> created
  newTodo.innerText = todoInput.value;
  //Add class name
  newTodo.classList.add("todo-item");

  //Appending or adding the new task/todo item to the container
  todoDiv.appendChild(newTodo);

  /*********ADD TODO TO LOCAL STORAGE*********/
  saveLocalTodos(todoInput.value);

  //Check mark button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fa fa-check"></i>';
  //Add class name
  checkButton.classList.add("check-btn");

  //Append or add check button to the div/container
  todoDiv.appendChild(checkButton);

  //Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  //Add class name
  deleteButton.classList.add("delete-btn");

  //Append or add delete button to the div/container
  todoDiv.appendChild(deleteButton);

  //APPEND CONTAINER TO THE UL LIST CONTAINER THAT WILL HOLD THE ENTIRE THING
  todoList.appendChild(todoDiv);

  //Clear todo <INPUT> value, so that after adding the value it does not stay in the input area
  todoInput.value = "";
}

//Delete or Check function
function deleteOrCheck(e) {
  const item = e.target;

  //Delete functionality
  if (item.classList[0] === "delete-btn") {
    //Remove the parent of the item
    const todo = item.parentElement;
    todo.classList.add("fall"); //To animate a falling scenario
    
    //To remove the todo from local storage as well
    removeLocalTodos(todo);

    //To remove the item after the animation is completed
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //Check functionality
  if (item.classList[0] === "check-btn") {
    //Remove the parent of the item
    const todo = item.parentElement;
    todo.classList.toggle("checked");
  }
}

//Filter functionality depending on what is selected: All, Completed, Incomplete
function filterTodo(e) {
  //Get all todos/tasks and convert the NodeList to an array of elements
  const todos = Array.from(todoList.children);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Saving the todos to local storage
function saveLocalTodos(todo) {
  let todos;
  //Check if todo is already in storage
  if (localStorage.getItem("todos") === null) {
    //If does not exist, create a empty array
    todos = [];
  } else {
    //parse back localStorage, assuming there's something there, parse/create it back into an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  //Store the todo
  localStorage.setItem("todos", JSON.stringify(todos));
}

//To reflect the results in the loacl storage and UI
function getTodos() {
  let todos;
  //Check if todo is already in storage
  if (localStorage.getItem("todos") === null) {
    //If does not exist, create a empty array
    todos = [];
  } else {
    //parse back localStorage, assuming there's something there, parse/create it back into an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //Loop over each todo
  todos.forEach(function (todo) {
    /******************Code from addTodo() function defined earlier******************/
    //Creating ToDo div, which is a container that will hold the elements/todos/tasks added
    const todoDiv = document.createElement("div");
    //Add class name
    todoDiv.classList.add("todo");

    //Create <li>, this is each task/todo individually which is contained in the todoDiv container created above
    const newTodo = document.createElement("li");
    //Value for the todo item/ <li> created <<<<CHANGED>>>>>
    newTodo.innerText = todo;
    //Add class name
    newTodo.classList.add("todo-item");

    //Appending or adding the new task/todo item to the container
    todoDiv.appendChild(newTodo);

    //Check mark button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa fa-check"></i>';
    //Add class name
    checkButton.classList.add("check-btn");

    //Append or add check button to the div/container
    todoDiv.appendChild(checkButton);

    //Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    //Add class name
    deleteButton.classList.add("delete-btn");

    //Append or add delete button to the div/container
    todoDiv.appendChild(deleteButton);

    //APPEND CONTAINER TO THE UL LIST CONTAINER THAT WILL HOLD THE ENTIRE THING
    todoList.appendChild(todoDiv);
  });
}

//Remove local storage todos when they are deleted so that during a reload they do not pop up again
function removeLocalTodos(todo) {
  let todos;
  //Check if todo is already in storage
  if (localStorage.getItem("todos") === null) {
    //If does not exist, create a empty array
    todos = [];
  } else {
    //parse back localStorage, assuming there's something there, parse/create it back into an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //Get index of todo
  const todoIndex = todo.children[0].innerText;
  //To remove element from index where it is located
  todos.splice(todos.indexOf(todoIndex), 1); //1 represents the element, meaning remove one element

  //Reset local storage after removing element
  localStorage.setItem('todos', JSON.stringify(todos));
}
