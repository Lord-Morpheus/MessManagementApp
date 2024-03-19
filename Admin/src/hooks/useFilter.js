import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

export const useFilter = ({ hostel, mess, batch, fromDate, username, toDate }) => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/filter`, {
            params: {
                hostel,
                mess,
                batch,
                fromDate,
                username,
                toDate,
            },
            headers: {
                Authorization: `Admin ${getToken()}`,
            }
        })
            .then((res) => {
                setStudents(res.data.data);
                setLoading(false);
            })
    }, [hostel, mess, batch, fromDate, username, toDate]);

    return { students, loading };
}
