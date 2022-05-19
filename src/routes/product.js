
const {  DataTypes } = require("sequelize");
const db = require("../db/database");

// convert model res
const Products = db.define('Product', {
    prodName: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    qty: DataTypes.INTEGER
});

const ProductDetails = db.define('Product_details', {
    dsc: DataTypes.STRING,
    variand: DataTypes.STRING,
    productId: DataTypes.INTEGER,
});

const addProduct = async (req, res) => {
    var  {prodName, price, qty, dsc, variand} = req.body;
    const product = await Products.create({prodName, price, qty});
    if(product.id > 0){
        let id = product.id;
        await ProductDetails.create({dsc, variand,productId: id});
        res.status(200).json(product);
    }
}

const findAll = async (req, res) => {
    const products = await  Products.findAll();
    res.status(200).json(products);
}

const findOne = async (req, res) => {
    let {id} = req.params;
    const product = await Products.findOne({where:{id:id}});
    res.status(200).json(product);
}

const deleteProduct = async (req, res) => {
    let {id} = req.params;
    await Products.destroy({where: {id:id}});
    // const deleteList =  await Products.destroy({where: {id:[1,2,3,4]}});
    res.status(200).json('is deleted !');
}

const updateProduct = async (req, res) => {
    const model = {id, firstName, lastName, email} = req.body;
    const findItem = await Products.findByPk(model.id);     
    if(findItem){
     const updateRes = await Products.update(model, {where: {id:model.id}});
     res.status(200).json(updateRes);
    }else{
      res.status(500).send('not have user');
    }
}

module.exports = {
    addProduct,
    findAll,
    findOne,
    deleteProduct,
    updateProduct
  };
