import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        regNo: "",
        branch: "",
        roomNumber: "",
        phoneNo: "",
        email: "",
        password: "",
        role: "student", // default role
    });

    const [msg, setMsg] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const changeHandle = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                console.log(res.data);
                // Store token and role in localStorage
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                // Navigate to profile page
                navigate("/profile");
                window.location.reload(true);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);
                setMsg(error.response.data.msg);
                // Trigger snackbar for 3 seconds
                setShowSnackbar(true);
                setTimeout(() => setShowSnackbar(false), 3000);
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="card shadow-sm my-5">
                        <div className="card-header bg-primary">
                            <h3 className="text-light">Register</h3>
                        </div>
                        <div className="card-body">
                            {showSnackbar && (
                                <div id="snackbar" className="show bg-danger">
                                    <strong>{msg}</strong>
                                </div>
                            )}
                            <form onSubmit={submitHandle}>
                                <div className="row">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="name"
                                            className="form-label"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={changeHandle}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={changeHandle}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="regNo"
                                            className="form-label"
                                        >
                                            Registration No
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="regNo"
                                            value={formData.regNo}
                                            onChange={changeHandle}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="branch"
                                            className="form-label"
                                        >
                                            Branch
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="branch"
                                            value={formData.branch}
                                            onChange={changeHandle}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="roomNumber"
                                            className="form-label"
                                        >
                                            Room Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="roomNumber"
                                            value={formData.roomNumber}
                                            onChange={changeHandle}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="phoneNo"
                                            className="form-label"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="phoneNo"
                                            value={formData.phoneNo}
                                            onChange={changeHandle}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="password"
                                            className="form-label"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={changeHandle}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Register
                                    </button>
                                    <Link
                                        className="nav-link float-end"
                                        to="/login"
                                    >
                                        Already have an account? Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
