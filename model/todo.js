//Liste des ToDos
const todos = [
    {
        "texte" : "Finir le laboratoire 1",
        "estFait" : false
      },
      {
        "texte" : "Finir le laboratoire 2",
        "estFait" : false
      },
      {
        "texte" : "Finir le laboratoire 3",
        "estFait" : false
      },
      {
        "texte" : "Finir le laboratoire 4",
        "estFait" : true
      }
];

export function getTodos() {
    return todos;
}

export function addTodo(texte){
    const todo = {

        texte : texte,
        estFait : false
    };
    todos.push(todo);
    return todos.length - 1;
}

export function CocherTodo(Index){
    todos[Index].estFait = !todos[Index].estFait;
}