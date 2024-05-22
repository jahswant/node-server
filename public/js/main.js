const ul = document.getElementById("todo_list");
const form = document.getElementById("form-add");
const inputtext = document.getElementById("text-add");

async function getTodosServer() {
    const response = await fetch("/api/todos");
    if (response.ok) {
        const todos = await response.json();
        for (let i = 0; i < todos.length; i++) {
            addTodoClient(i, todos[i].texte, todos[i].estFait);
        }
    }
}

function addTodoClient(Index, Texte, EstFait) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.index = Index;
    checkbox.checked = EstFait;
    checkbox.addEventListener("change", checkTodoServeur)
    const p = document.createElement("p");
    p.innerText = Texte;
    li.append(checkbox);
    li.append(p);
    ul.append(li);

}

async function addTodoServer(event) {
    event.preventDefault();

    const data = {
        texte: inputtext.value

    }

    const response = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (response.ok) {

        const value = await response.json();
        addTodoClient(value.index, data.texte, false);

        inputtext.value = "";
        inputtext.focus();

    }
}

function checkTodoServeur(event) {

    const data = {
        index: Number(event.currentTarget.dataset.index)

    }

    fetch("/api/todo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

form.addEventListener("submit",addTodoServer);

getTodosServer();


