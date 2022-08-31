"use strict";
const userApi = require('./user');
const itemApi = require('./items');
const sizeApi = require('./size');


const router = require("express").Router();
router.use(userApi);
router.use(itemApi);
router.use(sizeApi);
module.exports = router