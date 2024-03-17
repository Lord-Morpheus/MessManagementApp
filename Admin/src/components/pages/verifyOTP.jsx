import React from 'react';
import logimg from '../images/login.svg';
import { Link } from "react-router-dom";
import Security from '../images/otp.svg'

export default function Signup() {
  return (
    <div className="background bg-aliceblue d-flex justify-content-center align-items-center">
      <div className="signupbox h-85 w-70 d-flex flex-direction-row justify-content-space-between align-items-center rounded-10">
        <div className="image h-95 w-50 bg-#ffdab9 d-flex justify-content-center align-items-center ml-1.7 rounded">
          <img className='h-80 w-100' src={Security} alt="not found" />
        </div>
        <div className="signform h-100 w-50 d-flex flex-direction-column justify-content-center align-items-center">
          <h2 className="head fw-bolder">Verification</h2>
          <form className='mt-5 mb-3 fw-bold' >
            <div className='form-field'>
              Enter OTP <br />
              <div className="field input-group mb-1 border border-secondary">
                <span className='input-group-text' >
                  <i class="bi bi-eye-fill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  </i>
                </span>
                <input type="password" id="password" name="password" label="Password" placeholder="••••••••••" />
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-end fw-normal">
              <p className="fs-6">Did not recieve OTP?--</p>
              <Link className='link' to="/Signup">resend OTP</Link>
            </div>

            <div className='submit d-flex justify-content-center'>
              <Link className='w-100 d-flex justify-content-center text-decoration-none' to='/signup'>
                <button type="button" className="btn btn-success w-80 bg-#ffdab9 fw-bold">Verify OTP</button>
              </Link>
            </div>
          </form>
          <p className='login d-flex justify-content-center w-80 border-top-dotted'>
            Already have a account?--
            <Link className='link' to="/login">login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}