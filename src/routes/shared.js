'use strict';
const jwt = require("jsonwebtoken");

function uploadImgFunc() {
    const multer = require("multer");
    const fileStorageEngine = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./src/uploads");
      },
      filename: function (req, file, cb) {
        // const uniqueSuffix =  Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname);
      },
    });
    // const upload = multer({ storage: fileStorageEngine, limits:{ fileSize: 1024 * 1024 * 5 } });
    return multer({ storage: fileStorageEngine });
}

function deleteImgFunc(imgName) {
    fs.unlinkSync("./src/uploads" + imgName);
}

function setToken(data){
    const token = jwt.sign(data, "khamlarMasterToken");
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, "khamlarMasterToken");
}

module.exports = {
    uploadImgFunc,
    deleteImgFunc,
    setToken,
    verifyToken,
};
