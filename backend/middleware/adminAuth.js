const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "shopez-dev-secret";

const adminAuth = (req, res, next) => {
    const header = req.header("Authorization");
    const token = header?.startsWith("Bearer ") ? header.slice(7) : header;

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, jwtSecret);
        if (verified.role !== "admin") {
            return res.status(403).json({ message: "Admin access required" });
        }
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = adminAuth;