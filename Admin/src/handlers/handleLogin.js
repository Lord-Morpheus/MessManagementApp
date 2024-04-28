import axios from "axios";
import { setToken } from "../utils/getToken";
import swal from "sweetalert";

export const handleLogin = async ({ username, password }) => {

    try {
        console.log(import.meta.env.VITE_BACKEND_URI)
        const { status, data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URI}/admin/signin`,
            { username, password }
        );

        const { token } = data;

        setToken(token);

        if (status === 200) {
            console.log("Data saved successfully");
        } else {
            console.error("Failed Siging in the user");
        }
    } catch (error) {
        console.error("Error:", error);
        swal(error.response.data.message);
        window.location.reload();
    }
};