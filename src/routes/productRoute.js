
const { sequelize, DataTypes } = require('../db/database');
const product = require('../models/product');
const Products = require('../models/product')(sequelize, DataTypes);
const ProductDetails = require('../models/product_detail')(sequelize, DataTypes);
const router = require('express').Router();
Products.hasOne(ProductDetails, { foreignKey: 'productId' });
ProductDetails.belongsTo(Products, {foreignKey: 'productId'});

// for img
const multer  = require('multer')
const fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix =  Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix + '-' +  file.originalname)
      }

}); 
const upload = multer({ storage: fileStorageEngine});

// router.post('/uploadfile', upload.single('image') , (req, res) => {
//     console.log('xxxxxxxxxxxxxxxxxxxxxx',req.file);
//     console.log('zzzzzzzzzzzzzzzzzzzzzz',req.body);
//     res.send('done !');
// })

// end img

router.post('/product/add-product', upload.single('image'), async(req, res) => {
    try{
        var  {prodName, price, qty, dsc, variand, active} = req.body;
        const product = await Products.create({prodName, price, qty,image: req.file.filename, active});
        if(product.id > 0){
            let id = product.id;
            await ProductDetails.create({dsc, variand,productId: id});
            res.status(200).json(product);
        }
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/product/edit-product', upload.single('image'), async(req, res) => {
    try{
        const imgName = req.file.filename;
        const model = {id, prodName, price, qty} = req.body;
        const deltelModal = {id, dsc, variand} = req.body;
        const findItem = await Products.findByPk(model.id);   

        if(findItem){
        const updateRes = await Products.update({prodName: model.prodName,price: model.price, qty: model.qty,image: imgName}, {where: {id:model.id}});
        const detail = await ProductDetails.update(deltelModal, {where: {productId:model.id}});
        (updateRes && detail)? res.status(200).send('Update Done !'): res.status(500).send('Update error!');
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
                {model: ProductDetails}
            ]});
        res.status(200).json(tasks);

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
                {model: ProductDetails}
            ]});
        res.status(200).json(tasks);
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
                {model: ProductDetails}
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

module.exports = router;