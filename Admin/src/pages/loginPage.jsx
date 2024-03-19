import { useState } from "react";
import logimg from "../images/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../handlers/handleLogin";
import { getToken } from "../utils/getToken";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-aliceblue h-lvh flex justify-center items-center">
      <div className=" bg-white w-4/6 h-5/6 w-70 flex flex-row justify-space-between items-center rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="image w-1/2 bg-peachette flex justify-center items-center ml-4">
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
                  placeholder="enter your username"
                  onChange={(e) => setUsername(() => e.target.value)}
                />
              </div>
            </div>

            <div className="form-field mt-5">
              <div className="mb-1">Password</div>
              <div className="flex rounded-lg shadow-sm border-black border-solid">
                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                  <i className="bi bi-eye-fill">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </i>
                </span>
                <input
                  type="text"
                  className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="••••••••••"
                  onChange={(e) => setPassword(() => e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 flex justify-end font-normal mt-2">
              <Link className="text-blue-600 underline" to="/Signup">
                Forgot password
              </Link>
            </div>

            <div className="w-full flex justify-center my-5">
              <button
                type="button"
                className="w-48 h-9 bg-peachette rounded-md"
                onClick={async () => {
                  await handleLogin({ username, password });
                  if (getToken()) {
                    navigate("/home");
                  }
                }}
              >
                Login
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
