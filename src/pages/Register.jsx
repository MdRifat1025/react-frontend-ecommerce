import { useState } from "react";
import axiosInstance from "../api/axios";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("register/", form);
            alert("User registered: " + res.data.username);
        } catch (err) {
            console.log(err.response.data);
            alert("Error: " + JSON.stringify(err.response.data));
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg p-4 rounded-4">
                        <h3 className="card-title text-center mb-4">Create Account</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control form-control-lg"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-lg"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="first_name"
                                    className="form-control form-control-lg"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="last_name"
                                    className="form-control form-control-lg"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100">
                                Register
                            </button>
                        </form>
                        <p className="text-center mt-3 text-muted">
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
