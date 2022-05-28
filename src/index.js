const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3030;
const path = require('path');
// router 
 app.use(express.json());
 app.use(cors());
 app.use(express.urlencoded({extended: true}));


 //set path for output img 
 const rootPath = path.resolve(__dirname, '../uploads');
 app.use('/files',express.static(rootPath));
 //

 const router = require('./routes/index');
 app.use('/api', router);



app.listen(port,() => {
    console.log('server serror:', port);
});

