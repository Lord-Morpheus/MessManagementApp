import React from "react";
import Sidebar from './sidebar';

export default function Mess() {
  return (
    <div className="h-lvh flex justify-content-start">
      <Sidebar />
      <div className="content flex flex-col w-full bg-aliceblue w-100">
        <li>image</li>
        <li>mess filter</li>
        <li>search filter</li>
        <li>mess menu upload</li>
        <li>footer</li>
      </div>
    </div>
  );
}
