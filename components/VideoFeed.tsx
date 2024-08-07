"use client";

import { useRef, useState, useEffect } from "react";
import { useClickCount } from "./hook/useClickCount";
import { useStartPoint } from "./hook/useStartPoint";
import { drawLine } from "./ui/drawLine";
import { useCanvasRef } from "./hook/useCanvasRef";
import { useVideoContainerRef } from "./hook/useVideoContainerRef";
import { updateYamlFile } from "@/utils/updateYamlFile";
import { LineSelector } from "./LineSelector";

type ViewOption =
  | ""
  | "horizontal"
  | "vertical"
  | "diagonal_right"
  | "diagonal_left";

export const VideoFeed = () => {
  const { canvasRef } = useCanvasRef();
  const { videoContainerRef } = useVideoContainerRef();
  const { clickCount, setClickCount } = useClickCount();
  const { startPoint, setStartPoint } = useStartPoint();

  useEffect(() => {
    const videoContainer = videoContainerRef.current;
    const canvas = canvasRef.current;

    if (videoContainer && canvas) {
      canvas.width = videoContainer.clientWidth;
      canvas.height = videoContainer.clientHeight;
    }

    const handleResize = () => {
      if (videoContainer && canvas) {
        canvas.width = videoContainer.clientWidth;
        canvas.height = videoContainer.clientHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleVideoClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (clickCount === 0) {
      setStartPoint({ x, y });
      setClickCount(1);
    } else if (clickCount === 1) {
      const endPoint = { x, y };
      drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, canvasRef);
      setClickCount(0);
      updateYamlFile(startPoint, endPoint);
    }
  };

  const setLine = (type: ViewOption) => {
    let point1, point2;

    switch (type) {
      case "horizontal":
        point1 = { x: 0, y: 240 };
        point2 = { x: 768, y: 240 };
        break;
      case "vertical":
        point1 = { x: 321, y: 0 };
        point2 = { x: 321, y: 768 };
        break;
      case "diagonal_right":
        point1 = { x: 643, y: 0 };
        point2 = { x: 0, y: 480 };
        break;
      case "diagonal_left":
        point1 = { x: 0, y: 0 };
        point2 = { x: 643, y: 480 };
        break;
      default:
        return;
    }

    drawLine(point1.x, point1.y, point2.x, point2.y, canvasRef);
    updateYamlFile(point1, point2);
  };

  return (
    <>
      <div className="w-[90vw] h-64 sm:h-[30rem] sm:w-[95vw] xl:w-[40vw] xl:h-[60vh] space-y-4 flex flex-col justify-center items-end">
        <LineSelector setLine={setLine} />
        <div
          //   className="relative w-[640px] h-[480px] overflow-hidden"
          className="relative w-[90vw] h-64 sm:h-[30rem] sm:w-[95vw] xl:w-[40vw] xl:h-[60vh] overflow-hidden"
          ref={videoContainerRef}
        >
          <img
            src={process.env.NEXT_PUBLIC_VIDEO_FEED}
            className="rounded-lg w-full h-full object-contain shadow-lg"
            alt="video_feed"
          />
          <canvas ref={canvasRef} className="absolute top-0 left-0" />
        </div>
      </div>
    </>
  );
};
