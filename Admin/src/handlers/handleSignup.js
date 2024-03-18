import axios from "axios";

export const handleSignup = async ({ name, username, email, password, adminSecret, OTP }) => {
    try {
        const { status, data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URI}/admin/signup`,
            { name, username, email, password, adminSecret, OTP }
        );

        const { token } = data;

        window.localStorage.setItem("token", token);

        if (status === 200) {
            console.log("Data saved successfully");
        } else {
            console.error("Failed Siging up the user");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};