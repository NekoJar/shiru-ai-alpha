import Image from "next/image";
import React from "react";

const Dashboard = () => {
  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-4 sm:p-0">
        <Image
          src="/fakeCam2.png"
          alt=""
          width={500}
          height={500}
          className="rounded-xl object-cover grayscale"
        />
        <div className="flex gap-8 text-5xl">
          <div className="flex flex-col justify-center">
            <p>In</p>
            <p>2</p>
          </div>
          <div className="flex flex-col justify-center">
            <p>Out</p>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
