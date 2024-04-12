import axios from "axios";
import { getToken } from "../utils/getToken";

export const handleFilter = async ({ hostel, mess, batch, fromDate, username, toDate }) => {
    // try {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/admin/filter`,
        {
            params: { hostel, mess, batch, fromDate, username, toDate }, // Pass parameters as query params
            headers: {
                Authorization: `Admin ${getToken()}`,
            },
        }
    );

    console.log(hostel, mess, fromDate, username, toDate);

    console.log(response.data.data);

    if (response.status === 200) {
        console.log("Filtered successfully");
    } else {
        console.error("Filtering failed");
    }
    // } catch (error) {
    //     console.error("Error:", error);
    // }
};