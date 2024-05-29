import sqlite3 from "sqlite3"
import {open} from "sqlite"
import {existsSync} from "fs"

const IS_NEW = !existsSync(process.env.DB_FILE);

async function createDatabase(conPromise){

    const connexion = await conPromise;

    await connexion.exec(
     `CREATE TABLE todo(
        id_todo INTEGER PRIMARY KEY,
        texte TEXT  NOT NULL,
        est_fait INTEGER  NOT NULL        
     );
     
     INSERT INTO todo(texte , est_fait) VALUES('TODO 1',false);
     INSERT INTO todo(texte , est_fait) VALUES('TODO 2',false);
     INSERT INTO todo(texte , est_fait) VALUES('TODO 3',false);
     INSERT INTO todo(texte , est_fait) VALUES('TODO 4',false);
     `
    );
 return conPromise;
}

// Base de données dans un fichier
let connectionPromise = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});


 if (IS_NEW){
    connectionPromise =  createDatabase(connectionPromise);
 }

 export {connectionPromise};

  
