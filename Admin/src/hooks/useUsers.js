import axios from "axios";
import { useState } from "react";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

export const useUsers = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const token = getToken();

    if (!token) {
        navigate("/login");
    }

    try {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URI}/admin/students`, {
                headers: {
                    Authorization: `Admin ${getToken()}`,
                },
            })
            .then((res) => {
                console.log(res.data.data);
                setUsers(res.data.data);
                setLoading(false);
            });

        return { users, loading };
    } catch (error) {
        const status = error.response.status;
        console.log(status);
        if (status === 401) {
            console.log("Not Authenticated");
            localStorage.removeItem("token");
            navigate("/login");
        }
    }
};