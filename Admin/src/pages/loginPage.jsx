import { useEffect, useState } from "react";
import logimg from "../images/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../handlers/handleLogin";
import { getToken } from "../utils/getToken";

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  useEffect(() => {
    onkeydown = async (e) => {
      if (e.key === "Enter") {
        setClicked(() => true);
        await handleLogin({ username, password });
        if (getToken()) {
          navigate("/home");
        }
      }
    };
  }, [username, password, navigate]);

  return (
    <div className=" h-lvh flex justify-center items-center">
      <div className=" bg-white w-4/6 h-5/6 w-70 flex flex-row justify-space-between items-center rounded shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="image w-1/2 bg-[#012169] flex justify-center items-center ml-4">
          <img className="w-full" src={logimg} alt="not found" />
        </div>
        <div className="h-full w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">Login</h2>
          <form className="w-4/5 font-medium">
            <div className="form-field mt-10">
              <div className="mb-1">Username</div>
              <div className="flex rounded-lg shadow-sm">
                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                  <i className="bi bi-person-fill">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </i>
                </span>
                <input
                  type="text"
                  className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="B22126"
                  onChange={(e) => setUsername(() => e.target.value)}
                />
              </div>
            </div>

            <div className="form-field mt-5">
              <div className="mb-1">Password</div>
              <div className="flex rounded-lg shadow-sm border-black border-solid">
                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                  <i
                    className="bi bi-eye-fill"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </i>
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="••••••••••"
                  onChange={(e) => setPassword(() => e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 flex justify-end font-normal mt-2">
              <Link className="text-blue-600 underline" to="/signup">
                Forgot password
              </Link>
            </div>

            <div className="w-full flex justify-center my-5">
              <button
                type="button"
                className={`w-48 h-9 bg-[#012169] rounded-md text-white ${
                  clicked && "cursor-not-allowed"
                } ${clicked && "bg-indigo-500"}`}
                onClick={async () => {
                  setClicked(() => true);
                  await handleLogin({ username, password });
                  if (getToken()) {
                    navigate("/home");
                  }
                }}
              >
                {!clicked ? (
                  "Login"
                ) : (
                  <div className="text-white">
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loging in...
                  </div>
                )}
              </button>
            </div>
          </form>
          <p className="flex justify-center w-4/5 border-t-4 border-dashed p-4">
            {"Don't have a account?--"}
            <Link className=" text-blue-600 underline" to="/getOTP">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
