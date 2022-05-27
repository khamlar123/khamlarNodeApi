
const { sequelize, DataTypes } = require("../db/database");
const Customer = require("../models/customer")(sequelize, DataTypes);
const router = require("express").Router();

router.get("/customer/get-customer", async (req, res) => {
    try {
        const filterItems = await Customer.findAll();
        (filterItems) ? res.status(200).json(filterItems) : res.status(500).json([]);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/customer/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const findItem = await Customer.findOne({ where: { id: id } });
        (findItem) ? res.status(200).json(findItem) : res.status(200).json([]);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/customer/add-customer", async (req, res) => {
    try {
        const cut = await Customer.create(req.body);
       ( cut)? res.status(200).json("add customer done !"): res.status(500).json([]);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/customer/:id", async (req, res) => {
    try {
        const cut = await Customer.destroy({ where: { id: req.params.id } });
        (cut)? res.status(200).json("delete customer done !"):res.status(500).json([]);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/customer/edit-customer", async (req, res) => {
    try {
        const updateModal = ({ id, fristName, lastName, email, phoneNo } = req.req);
       const cut = await Cutomer.update(updateModal, { where: { id: updateModal.id } });
       (cut) ? res.status(200).send("update done !"):res.status(500).json([]);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;
