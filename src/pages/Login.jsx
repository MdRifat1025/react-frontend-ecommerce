import { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("login/", form);
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            navigate("/profile"); // redirect to profile page
        } catch (err) {
            console.log(err.response.data);
            alert("Login failed: " + JSON.stringify(err.response.data));
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg p-4 rounded-4">
                        <h3 className="card-title text-center mb-4">Login</h3>
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
                                Login
                            </button>
                        </form>
                        <p className="text-center mt-3 text-muted">
                            Don’t have an account? <a href="/register">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
