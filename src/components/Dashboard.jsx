"use client";
import { Button } from "./ui/button";

const Dashboard = () => {
  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 flex flex-col gap-2 my-6 bg-[#e7e7e7] border-t-4 border-green-500 border rounded-lg space-y-1">
          <p className="font-serif">
            Name:-
            <span className="font-bold font-mono lg:text-xl ml-2">harsh</span>
          </p>
          <p className="font-serif">
            Email:-
            <span className="font-bold font-mono lg:text-xl ml-2">
              harsh555@gmail.com
            </span>
          </p>
          <Button
            size="sm"
            className="bg-green-500 text-black text-base font-semibold hover:bg-green-600 text-black/80 tracking-wide sm:text-xl"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
