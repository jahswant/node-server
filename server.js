// Loading configuration file
import "dotenv/config";

// Imports
import express, { json } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { addTodo, getTodos, CocherTodo } from "./model/todo.js";

// Creating the web server
const app = express();

// Adding middleware
app.use(helmet()); // Enhances security headers
app.use(compression()); // Compresses responses
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS)
app.use(json()); // Parses incoming JSON payloads
app.use(express.static("public")); // Serves static files from the "public" directory

// Defining routes

// Endpoint to get all todos
app.get('/api/todos', (request, response) => {
    const todos = getTodos();
    response.status(200).json(todos);
});

// Endpoint to add a new todo
app.post("/api/todo", (request, response) => {
    const texte = request.body.texte;
    const index = addTodo(texte);
    response.status(201).json({ index: index });
});

// Endpoint to toggle the completion status of a todo
app.patch("/api/todo", (request, response) => {
    const index = request.body.index;
    CocherTodo(index);
    response.status(200).end();
});

// Starting the server
app.listen(process.env.PORT); // Listens on the port specified in the environment variable
console.log("Server started");
console.log("http://localhost:" + process.env.PORT); // Logs the server URL
