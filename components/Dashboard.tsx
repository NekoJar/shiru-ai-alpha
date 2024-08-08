import Image from "next/image";
import { VisitorChartLocal } from "./VisitorChartLocal";
import { VideoFeed } from "./VideoFeed";

const Dashboard = async () => {
  return (
    <div className="py-0 sm:py-12 space-y-12 p-4 h-[80vh]">
      <div className="flex flex-col xl:flex-row items-center justify-center md:justify-evenly md:p-0 gap-4 sm:gap-4 xl:gap-0">
        <VideoFeed />

        <div className="w-[92vw] xl:w-[50vw] space-y-4 sm:space-y-4">
          <VisitorChartLocal />
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
