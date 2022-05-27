const userApi = require('./userRoute');
const producctApi = require('./productRoute');
const customerApi = require('./cutomerRoute');
const invoiceApi = require('./invoiceRoute');
const loginApi = require('./loginRoute');
const router = require('express').Router();

// // url for login
// router.post('/login', loginController.login);
// router.post('/reset-password', loginController.resetPassword);


router.use(userApi);
router.use(producctApi);
router.use(customerApi);
router.use(invoiceApi);
router.use(loginApi);


module.exports = router