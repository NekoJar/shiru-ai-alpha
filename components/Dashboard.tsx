import Image from "next/image";
import React from "react";
import { VisitorChart } from "./VisitorChart";

const Dashboard = () => {
  return (
    <div className="py-0 sm:py-12 space-y-12 p-4 h-[80vh]">
      <div className="flex flex-col lg:flex-row items-center justify-center md:justify-evenly md:p-0 gap-4 sm:gap-4 xl:gap-0">
        {/* <Image
          src="/fakeCam2.png"
          alt=""
          width={600}
          height={600}
          className="rounded-lg object-cover shadow-lg"
        /> */}
        <video
          src="/test_1.mp4"
          width="600"
          height="600"
          className="rounded-lg object-cover shadow-lg"
          loop
          autoPlay
          muted
        ></video>

        <div className="w-[92vw] lg:w-[50vw] xl:w-[50vw] space-y-4 sm:space-y-10">
          <VisitorChart />
          <p className="text-sm sm:text-base">
            Shiru is an artificial intelligence designed to facilitate people
            counting through camera-based scanning. &copy;ShiruAI 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
