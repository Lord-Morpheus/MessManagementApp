import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
    return(
        <>
            <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-light ">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Admin</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="main collapse navbar-collapse" id="navbarNav">
                    <div class="navbar-nav">
                        <li class="nav-item">
                            <Link className='nav-link' to="/home">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link' to="/login">Login</Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link' to="/form">Form</Link>
                        </li>
                    </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
        
    )
}