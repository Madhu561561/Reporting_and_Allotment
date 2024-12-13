import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterStaff = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [regNo, setRegNo] = useState(""); // Add registration number state
    const [branch, setBranch] = useState(""); // Add branch state
    const [msg, setMsg] = useState([]);
    const navigate = useNavigate();

    const changeHandle = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "phoneNo":
                setPhoneNo(value);
                break;
            case "regNo": // Handle regNo change
                setRegNo(value);
                break;
            case "branch": // Handle branch change
                setBranch(value);
                break;
            default:
                break;
        }
    };

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            const newStaff = {
                username,
                name,
                email,
                password,
                phoneNo,
                regNo, // Include regNo
                branch, // Include branch
            };

            const res = await axios.post("/api/RegisterStaff", newStaff, {
                headers: {
                    "Content-type": "application/json",
                },
            });

            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                navigate("/staffprofile");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMsg([error.response.data.msg]);

                // Show error message
                setTimeout(() => {
                    const forErrmsg = document.getElementById("snackbar");
                    if (forErrmsg) {
                        forErrmsg.className = "show bg-danger";
                        setTimeout(() => {
                            forErrmsg.className = forErrmsg.className.replace(
                                "show",
                                ""
                            );
                        }, 3000);
                    }
                }, 0);
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="card shadow-sm my-5">
                        <div
                            className="card-header"
                            style={{ backgroundColor: "#6a1b9a" }}
                        >
                            <h3 className="text-light">Staff Registration</h3>
                        </div>
                        <div className="card-body">
                            {msg.length > 0 && (
                                <div id="snackbar">
                                    {msg.map((errMsg, index) => (
                                        <div key={index}>
                                            <strong>{errMsg}</strong>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <form onSubmit={submitHandle}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="username"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={changeHandle}
                                    />
                                </div>
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
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={changeHandle}
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
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={changeHandle}
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
                                        id="regNo"
                                        name="regNo"
                                        value={regNo} // Bind regNo state
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
                                        id="branch"
                                        name="branch"
                                        value={branch} // Bind branch state
                                        onChange={changeHandle}
                                        required
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
                                        type="text"
                                        className="form-control"
                                        id="phoneNo"
                                        name="phoneNo"
                                        value={phoneNo}
                                        onChange={changeHandle}
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
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={changeHandle}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterStaff;
