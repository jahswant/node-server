//Chargement du fichier de configuration
import "dotenv/config"

//Importations
import express, {json} from "express"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import {addTodo,getTodos,CocherTodo} from "./model/todo.js"

//Creation du serveur web
const app = express();

//Ajout des middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(json());
app.use(express.static("public"));

//Programmation des routes.

app.get('/todos', (request, response) => {
    const todos = getTodos();
    response.status(200).json(todos);
  });


app.post("/todo",(request,response)=>{
    const texte = request.body.texte;
    addTodo(texte);
    response.status(201).end();
});

app.patch("/todo",(request,response)=>{
const index = request.body.index;
   CocherTodo(index);
   response.status(200).end();
});




//Demarrage du serveur
app.listen(process.env.PORT);
console.log("Serveur Demarré");
console.log("http://localhost:" + process.env.PORT);



