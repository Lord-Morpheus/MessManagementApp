import React from "react";
import Sidebar from "./sidebar";

export default function Home() {
  return (
    <div className="grid grid-cols-9 relative">
      <aside className="self-start col-span-2 ">
        <Sidebar/>
      </aside>
      <div className="col-span-7 bg-aliceblue">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae tenetur
        ipsam impedit! Corrupti quia cupiditate maiores eligendi tenetur, magnam
        placeat odit quasi ea doloremque ullam vitae ad a. Reprehenderit itaque
        tempore ipsum mollitia libero?
      </div>
    </div>
  );
}
