import axios from "axios";
import { setToken } from "../utils/getToken";
import Swal from "sweetalert2";

export const handleSignup = async ({
  name,
  username,
  email,
  password,
  adminSecret,
  OTP,
}) => {
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
    Swal.fire({
      title: "Error",
      text: `${error.response.data.message}`,
      icon: "error",
    }).then(() => {
      window.location.reload();
    });
  }
};
