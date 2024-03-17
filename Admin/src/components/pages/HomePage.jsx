import React from "react";
import Sidebar from './sidebar';

export default function Home() {
  return (
    <div className="h-lvh flex justify-content-start">
      <Sidebar />
      <div className="content flex flex-col w-full bg-aliceblue w-100">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae tenetur
        ipsam impedit! Corrupti quia cupiditate maiores eligendi tenetur, magnam
        placeat odit quasi ea doloremque ullam vitae ad a. Reprehenderit itaque
        tempore ipsum mollitia libero?
      </div>
    </div>
  );
}
