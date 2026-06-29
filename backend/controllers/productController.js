const Product = require("../models/Product");

async function getProducts(req, res) {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function addProduct(req, res) {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json({ message: "Product Added" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateProduct(req, res) {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        return res.json({ message: "Product Updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.json({ message: "Product Deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct };