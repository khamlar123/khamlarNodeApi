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
    qty: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    productName: DataTypes.STRING,
});


const makeInvoice = async (req, res) => {   
    const {total,status,invoiceType,bankName,userId,discount,cutomerId, productList} = req.body;

    const getLastInvoice = await Invoices.findAll();
    let lastd = 0 ;

    if(getLastInvoice.length == 0){
        lastd =1; 
    }else{
         const id = Number(getLastInvoice[getLastInvoice.length - 1].dataValues.invocieNo);
         lastd =  (id+1);
    }
    const addInvoice = await Invoices.create({
        invocieNo: lastd.toString(), total:total, status: status, invoiceType: invoiceType,
        bankName:bankName, userId:userId, cutomerId:cutomerId, discount:discount
    })

    if(addInvoice){
        productList.forEach(p => {
           const addDetail = Invoice_details.create({invocieId: addInvoice.id, productId: p.productId, qty:p.qty,price:p.price,productName:p.productName});
           if(!addDetail){
                res.status(500).json('add invoice error !');
           }
        });
        res.status(200).json('add invoice done !');
    }else{
        res.status(500).json('add invoice error !');
    }
   
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
    const invoice = await Invoices.findAll();
    const invoiceDetail = await Invoice_details.findAll();
    const resl = [] = [];
    if(invoice){

        model = { 
            id: 0,
            invocieNo: '',
            total: 0,
            status: 0,
            invoiceType: 0,
            bankName: '',
            userId: 0,
            discount: 0,
        }
        
        invoice.forEach(e => {
            model.id = e.id;
            model.invocieNo = e.invocieNo;
            model.total = e.total;
            model.status = e.status;
            model.invoiceType = e.invoiceType;
            model.bankName = e.bankName;
            model.userId = e.userId;
            model.discount = e.discount;
            model.createdAt = e.createdAt;
            model.updatedAt= e.updatedAt;
            model.productList = invoiceDetail.filter(f => f.invocieId === e.id).map(m => {return {
                id: m.id,
                invocieId: m.invocieId,
                productId: m.productId,
                qty: m.qty,
                price: m.price,
            }})
            
            resl.push(model);
            model = {};
        });
        res.status(200).json(resl);
    }else{
        res.status(500).json('error'); 
    }
}

module.exports = {
    makeInvoice,
    findOne,
    findAll
}
