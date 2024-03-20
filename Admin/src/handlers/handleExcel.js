import axios from "axios";
import { getToken } from "../utils/getToken";
import fileDownload from 'js-file-download'

export const handleExport = async ({ hostel, mess, batch, date, username, day }) => {
    try {

        const { status, data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URI}/admin/export`,
            {
                responseType: 'blob',
                params: { hostel, mess, batch, date, username, day }, // Pass parameters as query params
                headers: {
                    Authorization: `Admin ${getToken()}`,
                },
            }
        );

        const { buffer } = data;

        fileDownload(buffer, 'users.xlsx');

        if (status === 200) {
            console.log("Data exported successfully");
        } else {
            console.error("Failed export file");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};