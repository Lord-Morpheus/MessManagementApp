import axios from "axios";

export const handleLogin = async ({ username, password }) => {
    try {
        const { status, data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URI}/admin/signin`,
            { username, password }
        );

        const { token } = data;

        window.localStorage.setItem("token", token);

        if (status === 200) {
            console.log("Data saved successfully");
        } else {
            console.error("Failed Siging in the user");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};