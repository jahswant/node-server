//Chargement du fichier de configuration
import "dotenv/config"

//Importations
import express, {json} from "express"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"

//Creation du serveur web
const app = express();

//Ajout des middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(json());

//Programmation des routes.

//Demarrage du serveur
app.listen(process.env.PORT);
console.log("Serveur Demarre");
console.log("http://localhost:" + process.env.PORT);



