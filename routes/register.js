const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {

    console.log(req.body);

    const {
        name,
        email,
        password,
        regNo,
        branch,
        role,
        phoneNo,
        roomNumber,
    } = req.body;

    const username= req.body.name

    // Basic validation
    if (
        !username ||
        !email ||
        !password ||
        !regNo ||
        !branch ||
        !phoneNo
    ) {
        return res
            .status(400)
            .json({ msg: "Please enter all required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Invalid email format" });
    }

    // Validate phone number format (assuming 10 digits)
    const phoneNoRegex = /^\d{10}$/;
    if (!phoneNoRegex.test(phoneNo)) {
        return res.status(400).json({ msg: "Invalid phone number format" });
    }

    try {
        // Check if user already exists by email or username
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ msg: "User with this email already exists" });
        }

        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: "Username already taken" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            username,
            email,
            password: hashedPassword,
            regNo,
            branch,
            phoneNo,
            roomNumber,
            role: role || "student", // Default role is student
        });

        console.log(user);

        await user.save();
        console.log(process.env.JWT_SECRET);
        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ msg: "JWT secret is not defined" });
        }

        const payload = { userId: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Send response
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
