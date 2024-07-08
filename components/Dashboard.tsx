import Image from "next/image";
import React from "react";

const Dashboard = () => {
  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row items-center justify-evenly p-4 sm:p-0">
        <Image
          src="/fakeCam2.png"
          alt=""
          width={700}
          height={700}
          className="rounded-xl object-cover"
        />
        <div className="w-[30vw] space-y-10">
          <p>
            Shiru is an artificial intelligence designed to facilitate people
            counting through camera-based scanning. &copy;ShiruAI 2024
          </p>
          <div className="flex gap-8 text-5xl">
            <div className="flex flex-col justify-center">
              <p>In</p>
              <p className="text-neutral-700">2</p>
            </div>
            <div className="flex flex-col justify-center">
              <p>Out</p>
              <p className="text-neutral-700">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
