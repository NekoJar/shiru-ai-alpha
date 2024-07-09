import Image from "next/image";
import React from "react";
import { VisitorChart } from "./VisitorChart";

const Dashboard = () => {
  return (
    <div className="py-0 sm:py-12 space-y-12 p-4 h-[80vh]">
      <div className="flex flex-col lg:flex-row items-center justify-center md:justify-evenly p-4 md:p-0 gap-4 sm:gap-4 lg:gap-0">
        <Image
          src="/fakeCam2.png"
          alt=""
          width={700}
          height={700}
          className="rounded-xl object-cover"
        />
        <div className="w-[80vw] lg:w-[40vw] space-y-4 sm:space-y-10">
          <p className="text-sm sm:text-base">
            Shiru is an artificial intelligence designed to facilitate people
            counting through camera-based scanning. &copy;ShiruAI 2024
          </p>
          <VisitorChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
