import axios from "axios";
import { useState } from "react";
import { getToken } from "../utils/getToken";

export const useFeedback = () => {
    const [loading, setLoading] = useState(true);
    const [students, seStudents] = useState([]);

    axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/getAll`, {
        headers: {
            Authorization: `Admin ${getToken()}`,
        }
    })
        .then((res) => {
            seStudents(res.data);
            console.log(res.data);
            setLoading(false);
        })

    return { students, loading };
}
