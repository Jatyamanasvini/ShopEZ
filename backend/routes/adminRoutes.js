const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const Order = require("../models/Order");
const User = require("../models/User");

// ── Dashboard stats ──
router.get("/stats", adminAuth, async (req, res) => {
    try {
        const [totalOrders, totalUsers, orders] = await Promise.all([
            Order.countDocuments(),
            User.countDocuments(),
            Order.find().sort({ createdAt: -1 }),
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const pendingOrders = orders.filter((o) => o.status === "Being shipped" || o.status === "Shipped").length;
        const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;
        const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

        // Freebies: items with price 0
        const totalFreebiesSent = orders.reduce((sum, o) => {
            return sum + o.items.filter((i) => i.price === 0).reduce((s, i) => s + i.quantity, 0);
        }, 0);

        // This month revenue
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const thisMonthOrders = orders.filter((o) => new Date(o.createdAt) >= startOfMonth);
        const thisMonthRevenue = thisMonthOrders.reduce((sum, o) => sum + o.total, 0);

        return res.json({
            totalOrders,
            totalUsers,
            pendingOrders,
            cancelledOrders,
            deliveredOrders,
            totalRevenue,
            thisMonthRevenue,
            totalFreebiesSent,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// ── All orders with user info ──
router.get("/orders", adminAuth, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// ── Update order status ──
router.patch("/orders/:id", adminAuth, async (req, res) => {
    try {
        const { status } = req.body;
        const valid = ["Being shipped", "Shipped", "Delivered", "Cancelled"];
        if (!valid.includes(status)) {
            return res.status(400).json({ message: `Status must be one of: ${valid.join(", ")}` });
        }
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        return res.json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// ── All users ──
router.get("/users", adminAuth, async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        // Attach order info per user
        const usersWithOrders = await Promise.all(
            users.map(async (u) => {
                const userOrders = await Order.find({ user: u._id }).sort({ createdAt: -1 });
                const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
                const orderCount = userOrders.length;
                const lastOrderDate = userOrders[0]?.createdAt || null;

                // Aggregate most purchased category
                const categoryCount = {};
                userOrders.forEach((o) => {
                    o.items.forEach((item) => {
                        const cat = item.name || "Unknown";
                        categoryCount[cat] = (categoryCount[cat] || 0) + item.quantity;
                    });
                });
                const topProduct = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

                return {
                    _id: u._id,
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    createdAt: u.createdAt,
                    orderCount,
                    totalSpent,
                    lastOrderDate,
                    topProduct,
                };
            })
        );
        return res.json(usersWithOrders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// ── Verify admin role ──
router.get("/verify", adminAuth, async (req, res) => {
    return res.json({ role: req.user.role });
});

module.exports = router;