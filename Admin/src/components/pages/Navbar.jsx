import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav
        class="relative flex w-full flex-nowrap items-center justify-between bg-gray-500 py-2 text-neutral-500 shadow-dark-mild hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div class="flex w-full flex-wrap items-center justify-between px-3">
          <div class="ms-2">
            <a class="text-xl text-black dark:text-white" href="#">
              Navbar
            </a>
          </div>

          <button
            class="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent3"
            aria-controls="navbarSupportedContent3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div
            class="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent3"
            data-twe-collapse-item
          >
            <div
              class="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
              data-twe-navbar-nav-ref
            >
              <div
                class="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2"
                data-twe-nav-item-ref
              >
                <Link className="text-black me-2" to='/home'>Home</Link>
              </div>

              <div
                class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <Link className="text-black me-2" to='/login'>Login</Link>
              </div>
              <div
                class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <Link className="text-black" to='/signup' data-twe-nav-link-ref> Signup</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
