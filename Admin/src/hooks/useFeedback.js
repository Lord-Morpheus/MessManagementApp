import axios from "axios";
import { useState } from "react";
import { getToken } from "../utils/getToken";

export const useFeedback = () => {
    const [loading, setLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState([]);

    axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/feedback`, {
        headers: {
            Authorization: getToken(),
        }
    })
        .then((res) => {
            setFeedbacks(res.data);
            console.log(res.data);
            setLoading(false);
        })

    return { feedbacks, loading };
}
