"use strict";
const userApi = require('./user');
const itemApi = require('./items');
const sizeApi = require('./size');
const typeApi = require('./type');
const refInventoryApi = require('./refInventory');
const menusApi = require('./menus');
const itemsApi = require('./items');
const customerApi = require('./customers');
const carApi = require('./car');


const router = require("express").Router();

router.use(userApi);
router.use(itemApi);
router.use(sizeApi);
router.use(typeApi);
router.use(refInventoryApi);
router.use(menusApi);
router.use(itemsApi);
router.use(customerApi);
router.use(carApi);


module.exports = router