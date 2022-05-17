const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/usuarios");
const db = require("./db/database");
const app = express();
const port = process.env.port || 3030;

    (async () => {
        try{
            await db.authenticate(); 
            await db.sync(); 
            console.log("connectados a la base de datos"); 
        }catch(error){
            throw new Error(error);
        }
     
    })();


 app.use(express.json());
 app.use(cors());

 app.use("/usuarios", usuarios);

app.listen(port,() => {
    console.log('server serror:', port);
});

