// // // src/components/RegisterWarden.js
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // function RegisterWarden() {
// //     const [name, setName] = useState("");
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [confirmPassword, setConfirmPassword] = useState("");
// //     const navigate = useNavigate();

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         if (password !== confirmPassword) {
// //             alert("Passwords do not match");
// //             return;
// //         }

// //         try {
// //             const response = await axios.post("/api/register/warden", {
// //                 name,
// //                 email,
// //                 password,
// //             });

// //             if (response.data.success) {
// //                 navigate("/login-warden");
// //             } else {
// //                 alert(response.data.message);
// //             }
// //         } catch (error) {
// //             console.error("Error registering warden", error);
// //         }
// //     };

// //     return (
// //         <div className="container">
// //             <h2>Register Warden</h2>
// //             <form onSubmit={handleSubmit}>
// //                 <div className="form-group">
// //                     <label htmlFor="name">Name</label>
// //                     <input
// //                         type="text"
// //                         className="form-control"
// //                         id="name"
// //                         value={name}
// //                         onChange={(e) => setName(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="email">Email</label>
// //                     <input
// //                         type="email"
// //                         className="form-control"
// //                         id="email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="password">Password</label>
// //                     <input
// //                         type="password"
// //                         className="form-control"
// //                         id="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="confirmPassword">Confirm Password</label>
// //                     <input
// //                         type="password"
// //                         className="form-control"
// //                         id="confirmPassword"
// //                         value={confirmPassword}
// //                         onChange={(e) => setConfirmPassword(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 <button type="submit" className="btn btn-primary">
// //                     Register
// //                 </button>
// //             </form>
// //         </div>
// //     );
// // }

// // export default RegisterWarden;
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [msg, setMsg] = useState([]);
//     const navigate = useNavigate();

//     const changeHandle = (e) => {
//         const { name, value } = e.target;
//         if (name === "name") setName(value);
//         if (name === "email") setEmail(value);
//         if (name === "password") setPassword(value);
//     };

//     const submitHandle = async (e) => {
//         e.preventDefault();
//         try {
//             const newUser = {
//                 name,
//                 email,
//                 password,
//             };

//             const res = await axios.post("/api/register-warden", newUser, {
//                 headers: {
//                     "Content-type": "application/json",
//                 },
//             });

//             if (res.status === 201) {
//                 navigate("/login-warden");
//             }
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 setMsg(error.response.data.message);
//                 var forErrmsg = document.getElementById("snackbar");
//                 forErrmsg.className = "show bg-danger";
//                 setTimeout(function () {
//                     forErrmsg.className = forErrmsg.className.replace(
//                         "show",
//                         ""
//                     );
//                 }, 3000);
//             }
//         }
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-4 m-auto">
//                     <div className="card shadow-sm my-5">
//                         <div className="card-header">
//                             <h3>Warden Register</h3>
//                         </div>
//                         <div className="card-body">
//                             {msg.length
//                                 ? msg.map((errMsg, index) => (
//                                       <div key={index} id="snackbar">
//                                           <strong>{errMsg}</strong>
//                                       </div>
//                                   ))
//                                 : null}
//                             <form onSubmit={submitHandle}>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="name"
//                                         className="form-label"
//                                     >
//                                         Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="name"
//                                         value={name}
//                                         onChange={changeHandle}
//                                         name="name"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="email"
//                                         className="form-label"
//                                     >
//                                         Email
//                                     </label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         id="email"
//                                         value={email}
//                                         onChange={changeHandle}
//                                         name="email"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="password"
//                                         className="form-label"
//                                     >
//                                         Password
//                                     </label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         id="password"
//                                         value={password}
//                                         onChange={changeHandle}
//                                         name="password"
//                                     />
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="btn btn-primary"
//                                 >
//                                     Register
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;
// src/components/RegisterWarden.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterWarden = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [regNo, setRegNo] = useState("");
    const [branch, setBranch] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
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
            case "regNo":
                setRegNo(value);
                break;
            case "branch":
                setBranch(value);
                break;
            case "phoneNo":
                setPhoneNo(value);
                break;
            case "roomNumber":
                setRoomNumber(value);
                break;
            default:
                break;
        }
    };

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                username,
                name,
                email,
                password,
                regNo,
                branch,
                phoneNo,
                roomNumber,
            };

            const res = await axios.post("/api/RegisterWarden", newUser, {
                headers: {
                    "Content-type": "application/json",
                },
            });

            if (res.status === 200) {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                navigate("/wardenprofile");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);
                setMsg(error.response.data.msg);
                var forErrmsg = document.getElementById("snackbar");
                forErrmsg.className = "show bg-danger";
                setTimeout(function () {
                    forErrmsg.className = forErrmsg.className.replace(
                        "show",
                        ""
                    );
                }, 3000);
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
                            <h3 className="text-light">Warden Registration</h3>
                        </div>
                        <div className="card-body">
                            {msg.length
                                ? msg.map((errMsg, index) => (
                                      <div key={index} id="snackbar">
                                          <strong>{errMsg}</strong>
                                      </div>
                                  ))
                                : null}
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

export default RegisterWarden;
