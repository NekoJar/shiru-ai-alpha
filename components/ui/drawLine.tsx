import { RefObject } from "react";

export const drawLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous lines
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.stroke();
};
