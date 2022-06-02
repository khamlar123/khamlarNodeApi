
const { sequelize, DataTypes } = require('../db/database');
const Products = require('../models/product')(sequelize, DataTypes);
const ProductDetails = require('../models/product_detail')(sequelize, DataTypes);
const Uids = require('../models/uid')(sequelize, DataTypes);
const router = require('express').Router();
Products.hasOne(ProductDetails, { foreignKey: 'productId' });
ProductDetails.belongsTo(Products, {foreignKey: 'productId'});

Products.hasMany(Uids, {foreignKey: 'productId'});
Uids.belongsTo(Products, {foreignKey: 'productId'});

// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;


// for img
const multer  = require('multer');
const uid = require('../models/uid');
const fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },

    filename: function (req, file, cb) {
        const uniqueSuffix =  Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix + '-' +  file.originalname)
    }
}); 
const upload = multer({ storage: fileStorageEngine, limits:{
    fileSize: 1024 * 1024 * 5
}});
// router.post('/uploadfile', upload.single('image') , (req, res) => {
    //     console.log('xxxxxxxxxxxxxxxxxxxxxx',req.file);
    //     console.log('zzzzzzzzzzzzzzzzzzzzzz',req.body);
    //     res.send('done !');
    // })
// end img

router.post('/product/add-product', upload.single('image'), async(req, res) => {
    try{
        var  {prodName, price, qty, dsc, variand, active, uidType, value,categoryId} = req.body;
        const product = await Products.create({prodName, price, qty,image: req.file.filename, active, categoryId});
        if(product.id > 0){
            let id = product.id;
            await ProductDetails.create({dsc, variand,productId: id});
            await Uids.create({uidType: uidType, value: value, productId: id});
            res.status(200).json(product);
            
            
        }
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/product/edit-product', upload.single('image'), async(req, res) => {
    try{
        const imgName = req.file.filename;
        const model = {id, prodName, price, qty, categoryId} = req.body;
        const deltelModal = {id, dsc, variand} = req.body;
        const uidModal = {uidtype, value} = req.body;

        const findItem = await Products.findByPk(model.id);   
        if(findItem){
            const updateRes = await Products.update({prodName: model.prodName,price: model.price, qty: model.qty,image: imgName, categoryId:model.categoryId}, {where: {id:model.id}});
            const detail = await ProductDetails.update(deltelModal, {where: {productId:model.id}});
            const uid = await Uids.update(uidModal, {where:{productId: model.id}});
            (updateRes && detail && uid)? res.status(200).send('Update Done !'): res.status(500).send('Update error!');
        }else{
            res.status(500).send('not have user');
        }
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/product/get-product', async (req, res) => {
    try{
        const tasks = await Products.findAll({ 
            where:{},
            include: [
                ProductDetails,
                Uids
            ]});
        (tasks)? res.status(200).json(tasks):res.status(500).json([]);

        //sty1
        //const products = await  Products.findAll();
        //     const details = await  ProductDetails.findAll();
        //     if(products && details){
        //         const productList = products.map(prod => ({ 
        //         ...prod.dataValues, 
        //         ...(details.find(item => item.productId === prod.id).dataValues ?? {})
        //         }));
        //         res.status(200).json(productList)
        //     }else{
        //         res.status(500).send('error !');
        //     }

    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/product/get-product-active', async(req, res) => {
    try{
        const tasks = await Products.findAll({ 
            where:{active: true},
            include: [
                ProductDetails,
                Uids
            ]});
        (tasks)? res.status(200).json(tasks):  res.status(200).json([]);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/product/:id', async(req, res) => {
    try{
        let{id} = req.params;
 
        const findProduct = await Products.findOne({ 
            where:{id:id},
            include:[
                ProductDetails,
                Uids
            ]
        });
       (findProduct)? res.status(200).json(findProduct):res.status(500).json('error') ;

        // const product = await Products.findOne({where:{id:id}});
        // const productDetails = await ProductDetails.findOne({where:{productId:id}});
        // if(product && productDetails){
        //     const resl = {
        //             id: product.id,
        //             prodName: product.prodName,
        //             price: product.price,
        //             qty: product.qty,
        //             dsc: productDetails.dsc,
        //             variand: productDetails.variand,
        //             createdAt: productDetails.createdAt,
        //             updatedAt: productDetails.updatedAt
        //     }
        //     res.status(200).json(resl);
        // }else{
        //     res.status(500).send('error');
        // }

    }catch(err){
        res.status(500).json(err);
    }
});

router.delete('/product/:id', async(req, res) => {
    try{
        let {id} = req.params;
        const findItem = await Products.findOne({where:{id: id}});
        if(findItem){
            const updaModal = {
                active: false
            }
            await Products.update(updaModal,{where:{id:id}})
            res.status(200).json('is deleted !');
        }else{
            res.status(500).json('is error !');
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// router.get("/products/:kw/:count/:skip", async (req, res) => {
//     //mode1
//     // const filterItems = await products.findAll({
  
//     //   include:[
//     //   productPrices,
//     //   preorder,
//     //   { model: productCateogries, include: [categoies] }
//     // ]});
//     // const resl = filterItems.map(m => m.dataValues).reverse().filter(f => f.description.toLowerCase().includes(req.params.kw.toLowerCase()));
//     // const masterRes = {count : resl.length,data : resl.splice(Number(req.params.skip), Number(req.params.count))};
//     // res.status(200).json(masterRes);
  
//     //mode2
//     // const search = await sequelize.query(`SELECT * FROM Products WHERE description LIKE '%${req.params.kw}%'`, { raw: true });
//     // res.status(200).json(search[0]);
  
//     const filterItems = await products.findAndCountAll({
//       where: {
//         [Op.or]: [
//           { description: { [Op.like]: "%" + req.params.kw + "%" } },
//           { type: { [Op.like]: "% " + req.params.kw + "%" } },
//         ],
//         [Op.and]: [{status: 1}]
//       },
//       limit: +req.params.count,
//       offset: +req.params.skip,
//       include: [
//         productPrices,
//         preorder,
//         { model: productCateogries, include: [categoies] },
//       ],
//     });
//     res.status(200).json(filterItems);
//   });

module.exports = router;