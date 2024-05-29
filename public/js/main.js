// Getting the reference to the <ul> element with id "todo_list"
const ul = document.getElementById("todo_list");
// Getting the reference to the <form> element with id "form-add"
const form = document.getElementById("form-add");
// Getting the reference to the <input> element with id "text-add"
const inputtext = document.getElementById("text-add");

// Function to fetch todos from the server
async function getTodosServer() {
    // Fetching todos from the server endpoint "/api/todos"
    const response = await fetch("/api/todos");
    if (response.ok) {
        // Parsing the response body as JSON
        const todos = await response.json();
        // Looping through the todos retrieved from the server
        for (let i = 0; i < todos.length; i++) {
            // Calling addTodoClient to add each todo to the client-side list
            addTodoClient(todos[i].id_todo, todos[i].texte, todos[i].est_fait);
        }
    }
}

// Function to add a todo to the client-side list
function addTodoClient(Index, Texte, EstFait) {
    // Creating a new <li> element
    const li = document.createElement("li");
    // Creating a new checkbox <input> element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.index = Index;
    checkbox.checked = EstFait;
    checkbox.addEventListener("change", checkTodoServeur);
    // Creating a new <p> element to display todo text
    const p = document.createElement("p");
    p.innerText = Texte;
    // Appending checkbox and text to the <li> element
    li.append(checkbox);
    li.append(p);
    // Appending <li> element to the <ul> element
    ul.append(li);
}

// Function to add a todo to the server
async function addTodoServer(event) {
    event.preventDefault();
    // Creating data object with todo text
    const data = {
        texte: inputtext.value
    };
    // Sending a POST request to server endpoint "/api/todo" with todo data
    const response = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        // Parsing the response body as JSON
        const value = await response.json();
        // Adding the new todo to the client-side list
        addTodoClient(value.index, data.texte, false);
        // Clearing the input field after adding todo
        inputtext.value = "";
        inputtext.focus();
    }
}

// Function to update todo status on the server
function checkTodoServeur(event) {
    // Creating data object with todo index
    const data = {
        index: Number(event.currentTarget.dataset.index)
    };
    // Sending a PATCH request to server endpoint "/api/todo" to update todo status
    fetch("/api/todo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

// Adding event listener to the form for submitting new todos
form.addEventListener("submit", addTodoServer);

// Fetching todos from the server when the page loads
getTodosServer();
