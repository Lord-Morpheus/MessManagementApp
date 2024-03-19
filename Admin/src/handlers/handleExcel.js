import axios from "axios";
import { getToken } from "../utils/getToken";
import fs from "fs";

export const handleExport = async ({ hostel, mess, batch, date, username, day }) => {
    try {

        const { status, data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URI}/admin/export`,
            { hostel, mess, batch, date, username, day },
            {
                headers: {
                    Authorization: `Admin ${getToken()}`,
                },
            }
        );

        const { buffer } = data;

        const filePath = 'students.xlsx';
        fs.writeFileSync(filePath, buffer);

        if (status === 200) {
            console.log("Data exported successfully");
        } else {
            console.error("Failed export file");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};