import { DropDown } from "../components/DropDown";
import HomeCard1 from "../components/HomeCard1";
import HomeCard2 from "../components/HomeCard2";
import MessCard1 from "../components/MessCard";
import { SidebarDrawer } from "../components/SidebarDrawer";
import { Card } from "../components/ui/card";

import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="row-span-1">
        <Navbar />
      </div>
      <SidebarDrawer />
      <Card className="flex flex-col p-2 m-12 md:p-2">
        <div>
          <h1 className="text-4xl font-bold text-center m-4">Analytics</h1>
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 mx-12 md:gap-4 md:p-4">
          <div className="grid gap-12 md:grid-cols-2">
            <HomeCard1 />
            <HomeCard1 />
            <HomeCard1 />
            <HomeCard1 />
          </div>
        </main>
      </Card>
    </div>
  );
}
