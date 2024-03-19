import axios from "axios";
import { useState } from "react";
import { getToken } from "../utils/getToken";

export const useExport = ({ hostel, mess, batch, date, username, day }) => {
    const [loading, setLoading] = useState(true);

    axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/export`, {
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
            console.log(res.data);
            setLoading(false);
        })

    return { loading };
}
