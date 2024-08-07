"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type ViewOption =
  | ""
  | "horizontal"
  | "vertical"
  | "diagonal_right"
  | "diagonal_left";

interface LineSelectorProps {
  setLine: (type: ViewOption) => void;
}

export const LineSelector: React.FC<LineSelectorProps> = ({ setLine }) => {
  const [lineType, setLineType] = useState<ViewOption>("");

  const handleSelectChange = (value: ViewOption) => {
    setLineType(value);
    setLine(value);
  };

  return (
    <div className="flex justify-between items-center w-[90vw] xl:w-[40vw] xl:px-4">
      <p className="w-[30vw] xl:w-[20vw] text-xs md:text-base">
        Select your preferred line type:
      </p>
      <Select value={lineType} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[60vw] xl:w-[20vw]">
          <SelectValue placeholder="None" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>View Options</SelectLabel>
            <SelectItem value="horizontal">Horizontal Line</SelectItem>
            <SelectItem value="vertical">Vertical Line</SelectItem>
            <SelectItem value="diagonal_right">Diagonal Right Line</SelectItem>
            <SelectItem value="diagonal_left">Diagonal Left Line</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
