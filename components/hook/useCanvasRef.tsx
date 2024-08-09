"use client";

import { useRef } from "react";

export const useCanvasRef = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return { canvasRef };
};
