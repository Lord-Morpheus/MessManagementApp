import axios from "axios";
import { getToken } from "../utils/getToken";

export const handleFilter = async ({ hostel, mess, batch, date, username, day }) => {
    try {

        const { status, data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URI}/admin/filter`,
            { hostel, mess, batch, date, username, day },
            {
                headers: {
                    Authorization: `Admin ${getToken()}`,
                },
            }
        );

        console.log(data);

        if (status === 200) {
            console.log("Filtered successfully");
        } else {
            console.error("Filtering failed");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};