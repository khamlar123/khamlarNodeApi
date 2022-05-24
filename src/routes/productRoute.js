
const {  DataTypes } = require("sequelize");
const db = require("../db/database");
const decode = require('../security/endCode');


// convert model res
const Products = db.define('products', {
    prodName: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    qty: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
});

const ProductDetails = db.define('product_details', {
    dsc: DataTypes.STRING,
    variand: DataTypes.STRING,
    productId: DataTypes.INTEGER,
});


const addProduct = async (req, res) => {
    var  {prodName, price, qty, dsc, variand, active} = req.body;
    const product = await Products.create({prodName, price, qty, active});
    if(product.id > 0){
        let id = product.id;
        await ProductDetails.create({dsc, variand,productId: id});
        res.status(200).json(product);
    }
}

const findAll = async (req, res) => {

   const key = decode.set('123456');

    console.log(decode.get((await key).toString()));

    const products = await  Products.findAll();
    const details = await  ProductDetails.findAll();
    if(products && details){
        const productList = products.map(prod => ({ 
        ...prod.dataValues, 
        ...(details.find(item => item.productId === prod.id).dataValues ?? {})
        }));
        res.status(200).json(productList)
    }else{
        res.status(500).send('error !');
    }
}

const findOnlyActive = async (req, res) => {
    const products = await  Products.findAll({where:{active: true}});
    const details = await  ProductDetails.findAll();
    if(products && details){
        const productList = products.map(prod => ({ 
            ...prod.dataValues, 
            ...(details.find(item => item.productId === prod.id).dataValues ?? {}) 
            }));
            res.status(200).json(productList)
        }else{
            res.status(500).send('error !');
        }
}

const findOne = async (req, res) => {
    let {id} = req.params;
    const product = await Products.findOne({where:{id:id}});
    const productDetails = await ProductDetails.findOne({where:{productId:id}});
    if(product && productDetails){
        const resl = {
                id: product.id,
                prodName: product.prodName,
                price: product.price,
                qty: product.qty,
                dsc: productDetails.dsc,
                variand: productDetails.variand,
                createdAt: productDetails.createdAt,
                updatedAt: productDetails.updatedAt
        }
        res.status(200).json(resl);
    }else{
        res.status(500).send('error');
    }
}

const deleteProduct = async (req, res) => {
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
}


const updateProduct = async (req, res) => {
    const model = {id, prodName, price, qty} = req.body;
    const deltelModal = {dsc, variand} = req.body;

    const findItem = await Products.findByPk(model.id);   
      
    if(findItem){
     const updateRes = await Products.update(model, {where: {id:model.id}});
     const detail = await ProductDetails.update(deltelModal, {where: {productId:model.id}});
     (updateRes && detail)? res.status(200).send('Update Done !'): res.status(500).send('Update error!');
    }else{
      res.status(500).send('not have user');
    }
}

module.exports = {
    addProduct,
    findAll,
    findOne,
    deleteProduct,
    updateProduct,
    findOnlyActive
  };
