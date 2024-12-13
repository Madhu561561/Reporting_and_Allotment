// server/routes/staffRoutes.js
/*const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/users");

router.post("/RegisterStaff", RegisterStaff);

module.exports = router;

// server/controllers/staffController.js
const Staff = require("../models/users"); // Replace with your Staff model

const RegisterStaff = async (req, res) => {
    try {
        const { username, name, email, password, phoneNo } = req.body;

        // Add validation and hashing of password here if needed

        const newStaff = new Staff({
            username,
            name,
            email,
            password,
            phoneNo,
        });
        await newStaff.save();

        res.status(200).json({ msg: "Staff registered successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

module.exports = { RegisterStaff };
*/
// server/routes/staffRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const router = express.Router();

// Registration route
router.post("/RegisterStaff", async (req, res) => {
    const {
        username,
        name,
        email,
        password,
        regNo,
        branch,
        role,
        phoneNo,
        roomNumber,
    } = req.body;

    // Basic validation
    if (
        !username ||
        !name ||
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
            username,
            name,
            email,
            password: hashedPassword,
            regNo,
            branch,
            phoneNo,
            roomNumber,
            role:"staff", // Default role is student
        });

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

/*const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/users");

router.post("/RegisterStaff", async (req, res) => {
    try {
        const { username, name, email, password, phoneNo, regNo, branch } =
            req.body;

        // Check if all fields are provided
        if (!regNo || !branch) {
            return res
                .status(400)
                .json({ msg: "Registration number and branch are required." });
        }

        const newStaff = new Staff({
            username,
            name,
            email,
            password,
            phoneNo,
            regNo, // Ensure regNo is saved
            branch, // Ensure branch is saved
        });

        await newStaff.save();
        res.status(200).json({ msg: "Staff registered successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

module.exports = router;
*/

/*const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/users"); // Only import once

// Define the RegisterStaff route and logic
router.post("/RegisterStaff", async (req, res) => {
    try {
        const { username, name, email, password, phoneNo } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new staff entry
        const newStaff = new Staff({
            username,
            name,
            email,
            password: hashedPassword, // Save the hashed password
            phoneNo,
        });

        // Save staff in the database
        await newStaff.save();

        // Generate JWT token (you can add more fields if needed)
        const token = jwt.sign({ id: newStaff._id }, "your_jwt_secret_key", {
            expiresIn: "1h",
        });

        // Respond with token and role (optional)
        res.status(200).json({
            token,
            role: "staff",
            msg: "Staff registered successfully",
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

module.exports = router;
*/
