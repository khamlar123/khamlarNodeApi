const userApi = require('./userRoute');
const producctApi = require('./productRoute');
const customerApi = require('./cutomerRoute');
const invoiceApi = require('./invoiceRoute');
const loginApi = require('./loginRoute');
const uidApi = require('./uidsRoute');
const router = require('express').Router();

router.use(userApi);
router.use(producctApi);
router.use(customerApi);
router.use(invoiceApi);
router.use(loginApi);
router.use(uidApi);


module.exports = router