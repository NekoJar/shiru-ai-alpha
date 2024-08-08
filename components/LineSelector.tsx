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
import { updateYamlFile } from "@/utils/updateYamlFile";

type ViewOption =
  | ""
  | "horizontal"
  | "vertical"
  | "diagonal_right"
  | "diagonal_left";

export const LineSelector = () => {
  const [lineType, setLineType] = useState<ViewOption>("");

  const handleSelectChange = (value: ViewOption) => {
    setLineType(value);
    setLine(value);
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
    updateYamlFile(point1, point2);
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
