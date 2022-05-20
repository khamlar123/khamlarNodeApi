
const {  DataTypes, where } = require("sequelize");
const db = require("../db/database");

// convert model res
const Products = db.define('Product', {
    prodName: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    qty: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
});

const ProductDetails = db.define('Product_details', {
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
    const products = await  Products.findAll();
    const details = await  ProductDetails.findAll();

    if(products && details){
       products.forEach(f => {
          const del = details.find(ff => ff.productId == f.id);
          f.dataValues.dsc = del.dataValues.dsc;
          f.dataValues.variand = del.dataValues.variand;
        //   f.dataValues.detail = del.dataValues;
      });
        res.status(200).json(products);
    }
}

const findOnlyActive = async (req, res) => {
    const products = await  Products.findAll({where:{active: true}});
    const details = await  ProductDetails.findAll();
    if(products && details){
        products.forEach(f => {
           const del = details.find(ff => ff.productId == f.id);
           f.dataValues.dsc = del.dataValues.dsc;
           f.dataValues.variand = del.dataValues.variand;
         //   f.dataValues.detail = del.dataValues;
       });
         res.status(200).json(products);
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
    updateProduct,
    findOnlyActive
  };
