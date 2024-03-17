import React from 'react';
import { Outlet, Link } from "react-router-dom";
import EmailImg from '../images/emailImg.svg';

export default function Signup() {
    return(
        <div className="background bg-aliceblue d-flex justify-content-center align-items-center">
            <div className="signupbox h-85 w-70 d-flex flex-direction-row justify-content-space-between align-items-center rounded-10">
               <div className="image h-95 w-50 bg-#ffdab9 d-flex justify-content-center align-items-center ml-1.7 rounded">
                <img className='h-80 w-100' src={EmailImg} alt="not found" />
               </div>
                <div className="signform h-100 w-50 d-flex flex-direction-column justify-content-center align-items-center">
                  <h2 className="head fw-bolder">Verification</h2>
                  <form className='mt-5 mb-3 fw-bold' >
                  <div className='form-field'>
                        Email Id<br />
                        <div className="field input-group mb-3 border border-secondary">
                          <span className='input-group-text' >
                          <i class="bi bi-envelope-at-fill">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                            <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
                            <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"/>
                          </svg>
                          </i>
                          </span>
                          <input type="text" id="text" name="text" label="text" placeholder="username@gmail.com" autofocus={true}/>
                        </div>
                    </div>
                    
                    <div className='submit d-flex justify-content-center'>
                      <Link className='w-100 d-flex justify-content-center text-decoration-none' to='/OTP'>
                        <button type="button" className="btn btn-success bg-#ffdab9 fw-bold">Send OTP</button>
                      </Link>
                    </div>
                  </form>
                  <p className='login d-flex justify-content-center border-top-dotted'>
                    Already have a account?-- 
                    <Link className='link' to="/login">login</Link>
                  </p>
                </div>
            </div>
        </div>
    )
}