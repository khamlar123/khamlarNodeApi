const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3030;

// router 
 app.use(express.json());
 app.use(cors());
 app.use(express.urlencoded({extended: true}));

 const router = require('./routes/index');
 app.use('/api', router);


app.listen(port,() => {
    console.log('server serror:', port);
});

