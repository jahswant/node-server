import {connectionPromise} from "../connexion.js"

// Liste des ToDos
// Array to store the list of todos
const todos = [];

// Function to get all the todos
export async function getTodos() {

    const connexion = await connectionPromise;

    const todos = await connexion.all(
        `SELECT id_todo,texte,est_fait from todo`
    );

    return todos;


}

// Function to add a new todo
export async function addTodo(texte) {
    // Creating a new todo object with given text and setting its completion status to false

    const connexion = await connectionPromise;

    const result = await connexion.run(
        `INSERT INTO todo(texte,est_fait) 
        VALUES (?,?);`,
        [texte,0]
    );

    return result.lastID;
}

// Function to toggle the completion status of a todo
export async function CocherTodo(id_todo) {
    // Toggling the completion status of the todo at the specified index

    const connexion = await connectionPromise;

    const result = await connexion.run(
        `UPDATE todo 
         SET est_fait = NOT est_fait 
         WHERE id_todo = ?`,
        [id_todo]
    );
}
