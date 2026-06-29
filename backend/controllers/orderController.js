const Order = require("../models/Order");

async function createOrder(req, res) {
    try {
        const { items, total } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items are required" });
        }

        if (total == null || total <= 0) {
            return res.status(400).json({ message: "Valid total is required" });
        }

        const order = new Order({
            user: req.user.id,
            items,
            total,
            status: "Being shipped",
        });

        const savedOrder = await order.save();
        return res.status(201).json(savedOrder);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getOrders(req, res) {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { createOrder, getOrders };