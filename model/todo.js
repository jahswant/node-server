//Liste des ToDos
const todos = [];

export function getTodos() {
    return todos;
}

export function addTodo(texte){
    const todo = {

        texte : texte,
        estFait : false
    };
    todos.push(todo);
}

export function CocherTodo(Index){
    todos[Index].estFait = !todos[Index].estFait;
}