const {  DataTypes } = require("sequelize");
const db = require("../db/database");

// convert model res
const Invoices = db.define('invoices', {
    invocieNo: DataTypes.STRING,
    total: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    invoiceType: DataTypes.INTEGER,
    bankName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    discount: DataTypes.DOUBLE
});

const Invoice_details = db.define('invoice_details', {
    invocieId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
});


const makeInvoice = async (req, res) => {   
    const {total,status,invoiceType,bankName,userId,discount, productIds} = req.body;

    const getLastInvoice = await Invoices.findAll();
    let lastd = 0 ;

    if(getLastInvoice.length == 0){
        lastd =1; 
    }else{
        lastd =  getLastInvoice.dataValues.invocieNo +1
    }

    const addInvoice = await Invoices.create({invocieNo: lastd, total:total, status: status, invoiceType: invoiceType,bankName:bankName, userId:userId, discount:discount})

    if(addInvoice){
        productIds.forEach(p => {
           const addDetail = Invoice_details.create({invocieId: addInvoice.id, productId: p});
           if(!addDetail){
                res.status(500).json('add invoice error !');
           }
        });
    }
    res.status(200).json('add invoice done !');
}

const findOne = async (req, res) => {
        let {id} = req.params;
    const getInvoice = await Invoices.findOne({where:{id:id}});

        if(getInvoice){
            const resModal = {
                id: getInvoice.id,
                invocieNo: getInvoice.invocieNo,
                total: getInvoice.total,
                status: getInvoice.status,
                invoiceType: getInvoice.invoiceType,
                bankName: getInvoice.bankName,
                userId: getInvoice.userId,
                discount: getInvoice.discount,
                productList: await Invoice_details.findAll({where:{invocieId:id}})
            }
            res.status(200).json(resModal);
        }else{
            res.status(500).json('error');
        }
}

const findAll = async (req, res) => {
    const resl = await Invoices.findAll();
    res.status(200).json(resl);
}

module.exports = {
    makeInvoice,
    findOne,
    findAll
}
