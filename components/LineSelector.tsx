"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";

type ViewOption =
  | ""
  | "horizontal"
  | "vertical"
  | "diagonal_right"
  | "diagonal_left";

interface LineSelectorProps {
  setLine: (type: ViewOption) => void;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export const LineSelector: React.FC<LineSelectorProps> = ({
  setLine,
  isVisible,
  setIsVisible,
}) => {
  const [lineType, setLineType] = useState<ViewOption>("");

  const handleSelectChange = (value: ViewOption) => {
    setLineType(value);
    setLine(value);
  };

  return (
    <div className="flex justify-between items-center w-[90vw] xl:w-[40vw] xl:px-4">
      <div className="w-[30vw] xl:w-[20vw] text-xs md:text-base flex items-center gap-4">
        <p>Line visibility</p>
        <Switch
          checked={isVisible}
          onCheckedChange={() => setIsVisible(!isVisible)}
        />
      </div>
      <Select value={lineType} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[60vw] xl:w-[20vw]">
          <SelectValue placeholder="Select Line Type" />
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
