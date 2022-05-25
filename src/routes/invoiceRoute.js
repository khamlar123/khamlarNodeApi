const res = require("express/lib/response");
const { json } = require("express/lib/response");
const {  DataTypes, and, where, INTEGER } = require("sequelize");
const db = require("../db/database");
const invoice = require("../models/invoice");

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

    try{
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

            res.status(200).json({
                message: "invoice created",
                getLastInvoice,
            });

        }else{
            res.status(500).json('add invoice error !');
        }
    }catch{
        res.status(500).json({
            message: "invoice not successful created",
            error: error.mesage,
          })
    }
   
}

const findOne = async (req, res) => {
    //mode 1
    try{
     const invoice =  await db.query("SELECT * FROM `invoices` WHERE id ="+req.params.id);
     const invoiceDetail =  await db.query("SELECT id, invocieId , productId , qty,price,productName FROM invoice_details WHERE invocieId IN ("+req.params.id+")");
        resl = {
            "id": invoice[0][0].id,
            "invocieNo": invoice[0][0].invocieNo,
            "total": invoice[0][0].total,
            "status": invoice[0][0].status,
            "invoiceType": invoice[0][0].invoiceType,
            "bankName": invoice[0][0].bankName,
            "userId": invoice[0][0].userId,
            "discount": invoice[0][0].discount,
            "cutomerId": invoice[0][0].cutomerId,
            "createdAt": invoice[0][0].createdAt,
            "productList": invoiceDetail[0]
        }
        res.status(200).json(resl);
    }catch (error){
        res.status(500).json(error);
    }

    //mode 2
    // try{
    //     let {id} = req.params;
    //     const getInvoice = await Invoices.findOne({where:{id:id}});

    //     if(getInvoice){
    //         const resModal = {
    //             id: getInvoice.id,
    //             invocieNo: getInvoice.invocieNo,
    //             total: getInvoice.total,
    //             status: getInvoice.status,
    //             invoiceType: getInvoice.invoiceType,
    //             bankName: getInvoice.bankName,
    //             userId: getInvoice.userId,
    //             discount: getInvoice.discount,
    //             productList: await Invoice_details.findAll({where:{invocieId:id}})
    //         }
    //         res.status(200).json(resModal);
    //     }else{
    //         res.status(500).json('error');
    //     }
    // }catch (error){
    //     res.status(500).json(error);
    // }
}

const findAll = async (req, res) => {
try{
    const invoice = await Invoices.findAll();
    const invoiceDetail = await Invoice_details.findAll();
    const resl = [] = [];
    if(invoice){
        let model = {}
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
            model.productList = invoiceDetail.filter(f => f.invocieId === e.id).map(m => {return {
                id: m.id,
                productId: m.productId,
                productName: m.productName,
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
}catch (error){
    json.status(500).json(error)
}
}

const findNormalInvoice = async(req, res) => {
    const invoice = await Invoices.findAll({where:{status:1}});
    const invoiceDetail = await Invoice_details.findAll();
    const resl = [] = [];
    if(invoice){
        let model = {}
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
            model.productList = invoiceDetail.filter(f => f.invocieId === e.id).map(m => {return {
                id: m.id,
                productId: m.productId,
                productName: m.productName,
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

const findCancelInvoice = async(req, res) => {
    const invoice = await Invoices.findAll({where:{status: 0}});
    const invoiceDetail = await Invoice_details.findAll();
    const resl = [] = [];
    if(invoice){
        let model = {}
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
            model.productList = invoiceDetail.filter(f => f.invocieId === e.id).map(m => {return {
                id: m.id,
                productId: m.productId,
                productName: m.productName,
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


const cancelInvoice = async (req, res) => {
    try{
        
        const fidnitem = await Invoices.findOne({where:{id:req.params.id}});

        if(fidnitem){
            await Invoices.update({status: 0}, {where:{id: req.params.id}});
            res.status(200).json('cancel invoice done !');
        }else{
            res.status(500).json('cancel invoice error !'); 
        }

    }catch(error){
        res.status(200).json(err);
    }
}

module.exports = {
    makeInvoice,
    findOne,
    findAll,
    findNormalInvoice,
    findCancelInvoice,
    cancelInvoice
}
