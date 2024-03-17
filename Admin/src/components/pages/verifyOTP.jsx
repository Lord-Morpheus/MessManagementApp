import React from "react";
import { Link } from "react-router-dom";
import Security from "../images/otp.svg";

export default function verifyOTP() {
  return (
    <div className="bg-aliceblue h-lvh flex justify-center items-center">
      <div className="bg-white w-4/6 h-5/6 w-70 flex flex-row justify-space-between items-center">
        <div className="image w-1/2 bg-peachette flex justify-center items-center ml-4">
          <img className="w-full" src={Security} alt="not found" />
        </div>
        <div className="h-full w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">Verification</h2>
          <form className="w-4/5 font-medium">
            <div className="form-field">
              Enter OTP <br />
              <div className="flex rounded-lg shadow-sm">
                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                  <i class="bi bi-eye-fill">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  </i>
                </span>
                <input
                  type="text"
                  class="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="form-field">
              Enter OTP <br />
              <div className="flex rounded-lg shadow-sm">
                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                  <i class="bi bi-eye-fill">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  </i>
                </span>
                <input
                  type="text"
                  class="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="mb-3 flex justify-end font-normal ">
              <p className="fs-6">Did not recieve OTP?--</p>
              <Link className="text-blue-600 underline" to="/Signup">
                resend OTP
              </Link>
            </div>

            <div className="w-full flex justify-center mb-3 mt-3">
              <Link
                className="w-4/5 flex justify-center"
                to="/signup"
              >
                <button
                  type="button"
                  className="w-4/5 h-9 bg-peachette"
                >
                  Verify OTP
                </button>
              </Link>
            </div>
          </form>
          <p className="flex justify-center w-4/5 border-t-4 border-dashed">
            Already have a account?--
            <Link className="text-blue-600 underline" to="/login">
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
