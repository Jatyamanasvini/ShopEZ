const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "shopez-dev-secret";

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        const normalizedEmail = normalizeEmail(email);

        if (!name || !normalizedEmail || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email: normalizedEmail, password: hashedPassword, role: "user" });
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: "7d" });
        return res.status(201).json({ token, role: user.role, name: user.name, message: "Signup Successful" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const normalizedEmail = normalizeEmail(email);

        if (!normalizedEmail || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: "7d" });
        return res.json({ token, role: user.role, name: user.name });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { signup, login };
