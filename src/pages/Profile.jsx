import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get("profile/");
                setUser(res.data);
            } catch (err) {
                console.log(err);
                navigate("/login"); // redirect if not authenticated
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };

    if (!user)
        return (
            <div className="text-center mt-5">
                <p>Loading...</p>
            </div>
        );

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg p-4 rounded-4 text-center">
                        <h3 className="mb-4">Welcome, {user.first_name} {user.last_name}</h3>
                        <p>
                            <strong>Username:</strong> {user.username}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <button className="btn btn-danger btn-lg mt-3 w-100" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
