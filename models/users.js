const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: false,
        },
        role: {
            type: String,
            default: "student",
            enum: ["student", "warden", "staff"],
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        designation: {
            type: String,
            trim: true,
            required: false,
        },
        avatar: {
            type: String,
            required: false,
        },
        regNo: {
            type: String,
            trim: true,
            required: true,
        },
        branch: {
            type: String,
            trim: true,
            required: true,
        },
        roomNumber: {
            type: String,
            trim: true,
            required: false,
        },
        phoneNo: {
            type: String, // Changed to String to accommodate phone numbers with leading zeros
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true, // Ensure unique emails
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation regex
        },
        password: {
            type: String,
            required: true,
        },
        resetToken: {
            type: String,
            required: false,
        },
        expireToken: {
            type: Date,
            default: Date.now,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
