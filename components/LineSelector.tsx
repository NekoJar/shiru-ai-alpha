"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil1Icon } from "@radix-ui/react-icons";

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
    <div className="relative top-2 right-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Pencil1Icon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[40vw] xl:w-[10vw]">
          <DropdownMenuLabel>View Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={lineType}
            //@ts-ignore
            onValueChange={handleSelectChange}
          >
            <DropdownMenuRadioItem value="horizontal">
              Horizontal Line
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="vertical">
              Vertical Line
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="diagonal_right">
              Diagonal Right Line
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="diagonal_left">
              Diagonal Left Line
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
