"use client";

import { useState } from "react";

export const useStartPoint = () => {
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  return { startPoint, setStartPoint };
};
