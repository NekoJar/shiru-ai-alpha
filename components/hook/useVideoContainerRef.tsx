"use client";

import { useRef } from "react";

export const useVideoContainerRef = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  return { videoContainerRef };
};
