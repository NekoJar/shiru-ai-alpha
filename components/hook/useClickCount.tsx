"use client";

import { useState } from "react";

export const useClickCount = () => {
  const [clickCount, setClickCount] = useState(0);

  return { clickCount, setClickCount };
};
