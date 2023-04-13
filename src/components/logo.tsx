"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useWindowProvider } from "~/providers/window-provider";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Logo = () => {
  const { toggleSidebar, visibleSidebarButtonRef } = useWindowProvider();

  return (
    <div className="flex w-full items-center justify-between border-b p-3">
      <Link href="/" className="flex gap-2">
        <div className="h-6 w-6 rounded-full bg-black" />
        <p>Cluster</p>
      </Link>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={visibleSidebarButtonRef}
              variant="ghost"
              className="h-fit w-fit p-1 text-gray-400 hover:text-gray-500"
              onClick={toggleSidebar}
            >
              <ChevronLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle sidebar</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
