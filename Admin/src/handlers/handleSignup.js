import axios from "axios";
import { setToken } from "../utils/getToken";

export const handleSignup = async ({ name, username, email, password, adminSecret, OTP }) => {
    try {
        const { status, data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URI}/admin/signup`,
            { name, username, email, password, adminSecret, OTP }
        );

        const { token } = data;

        setToken(token);

        if (status === 200) {
            console.log("Data saved successfully");
            window.location.href = "/home";
        } else {
            console.error("Failed Siging up the user");
        }
    } catch (error) {
        console.error("Error:", error);
        alert(error.response.data.message);
        window.location.reload();
    }
};