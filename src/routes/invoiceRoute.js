const { sequelize, DataTypes } = require('../db/database');
const Invoices = require('../models/invoice')(sequelize, DataTypes);
const Invoice_details = require('../models/invoice_detail')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Customer = require('../models/customer')(sequelize, DataTypes);
const router = require('express').Router();
Invoices.hasMany(Invoice_details, {foreignKey: 'invocieId'});
Invoice_details.belongsTo(Invoices, {foreignKey: 'invocieId'});

User.hasOne(Invoices, {foreignKey: 'userId'});
Invoices.belongsTo(User, {foreignKey: 'userId'});

Customer.hasOne(Invoices, {foreignKey: 'cutomerId'});
Invoices.belongsTo(Customer, {foreignKey: 'cutomerId'})


    router.post('/invoice/add-invoice', async(req, res)=> {
        try{
            const {total,status,invoiceType,bankName,userId,discount,cutomerId, productList} = req.body;
            const getLastInvoice = await Invoices.findAll();
            let lastd = 0 ; 
            (getLastInvoice.length == 0)?lastd=1: lastd= (Number(getLastInvoice[getLastInvoice.length - 1].dataValues.invocieNo) + 1);
            const addInvoice = await Invoices.create({
                invocieNo: lastd.toString(), total:total, status: status, invoiceType: invoiceType,
                bankName:bankName, userId:userId, cutomerId:cutomerId, discount:discount
            })

            if(addInvoice){
                productList.forEach(p => {
                const addDetail = Invoice_details.create({invocieId: addInvoice.id, productId: p.productId, qty:p.qty,price:p.price,productName:p.productName});
                if(!addDetail){res.status(500).json('add invoice error !')}
                });
                res.status(200).json('add invoice done !');

            }else{
                res.status(500).json('add invoice error !');
            }

        }catch (err){
            res.status(500).json(err);
        }
    });

    router.get('/invoice/get-invoices', async(req, res) => {
        try{
        
            const invoices = await Invoices.findAll({
                where:{},
                include:[
                    {model:Invoice_details},
                    {model:User},
                    {model:Customer}
                ],
            });
            
            const mapData = invoices.map(m => {return {
                invocieNo: m.invocieNo,
                total: m.total,
                status: m.status,
                invoiceType: m.invoiceType,
                bankName: m.bankName,
                userId: m.userId,
                discount: m.discount,
                cutomerId: m.cutomerId,
                detail: m.invoice_details,
                userName: m.user.firstName,
                customerName: m.customer.fristName,
                createDate: m.createdAt,
            }});
           (invoices)? res.status(200).json(mapData):res.status(500).json([]);
        }catch (err){
            res.status(200).json(err)
        }
    });

    router.get('/invoice/:id', async(req, res) => {
        try{
            let {id} = req.params;
            const invoices = await Invoices.findOne({
                where:{id:id},
                include:[
                    {model:Invoice_details},
                    {model:User},
                    {model:Customer}
                ],
            });
         const  modelres = {
                invocieNo: invoices.dataValues.invocieNo,
                total: invoices.dataValues.total,
                status: invoices.dataValues.status,
                invoiceType: invoices.dataValues.invoiceType,
                bankName: invoices.dataValues.bankName,
                userId: invoices.dataValues.userId,
                discount: invoices.dataValues.discount,
                cutomerId: invoices.dataValues.cutomerId,
                detail: invoices.dataValues.invoice_details,
                userName: invoices.dataValues.user.firstName,
                customerName: invoices.dataValues.customer.fristName,
                createDate: invoices.dataValues.createdAt,
            }

            res.status(200).json(modelres)
        }catch (err){
            res.status(200).json(err)
        }
    });

    router.put('invoice/cancelInvoice/:id', async(req, res) => {
        try{            
            const cancel = await Invoices.update({status: 0}, {where:{id: req.params.id}});
            (cancel)? res.status(200).json('cancel invoice done !'): res.status(500).json('cancel invoice error !');

        }catch (err){
            res.status(500).json(err);
        }
    });

    

module.exports = router
