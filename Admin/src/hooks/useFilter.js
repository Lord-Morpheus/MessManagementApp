import axios from "axios";
import { useState } from "react";
import { getToken } from "../utils/getToken";

export const useFilter = ({ hostel, mess, batch, date, username, day }) => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/filter`, {
        data: {
            hostel,
            mess,
            batch,
            date,
            username,
            day,
        },
        headers: {
            Authorization: getToken(),
        }
    })
        .then((res) => {
            setStudents(res.data);
            console.log(res.data);
            setLoading(false);
        })

    return { students, loading };
}
