import React from "react";
import Sidebar from './sidebar';
import Eating1 from '../images/eatingImg1.svg';
import Eating2 from '../images/eatingImg2.svg';
export default function Mess() {
  return (
    <div className="grid grid-cols-9 relative">
      <aside className="self-start col-span-2 ">
        <Sidebar/>
      </aside>
      <div className="col-span-7 bg-aliceblue">
        
        <div className="flex justify-center bg-darkPeach">
          <img className="object-fill h-48 w-96" src={Eating1} alt="not found" />
          <img className="object-fill h-48 w-96" src={Eating2} alt="not found" />
          <img className="object-fill h-48 w-96" src={Eating1} alt="not found" />
        </div>
        <div>
          card
        </div>
        <li>search filter</li>
        <li>mess menu upload</li>
        <li>footer</li>
      </div>
    </div>
  );
}
