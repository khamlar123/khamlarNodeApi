const express = require("express");
const cors = require("cors");
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

// router 
 app.use(express.json());
 app.use(cors());
 app.use(express.urlencoded({extended: true}))
 const router = require('./routes/index');
 app.use('/api', router);




app.listen(port,() => {
    console.log('server serror:', port);
});

