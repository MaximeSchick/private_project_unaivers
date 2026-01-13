import React from "react";
import { cn } from "../../../lib/utils";

export default function SplitLayout({ isSplit, left, right }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 transition-[gap] duration-500 ease-out",
        isSplit ? "lg:flex-row lg:items-stretch" : "lg:items-center"
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-6 transition-[max-width] duration-500 ease-out",
          isSplit ? "lg:flex-1 lg:max-w-none" : "lg:max-w-4xl"
        )}
      >
        {left}
      </div>

      <div
        className={cn(
          "w-full overflow-hidden transition-all duration-500 ease-out",
          isSplit
            ? "opacity-100 translate-y-0 max-h-[1200px] lg:w-[38%]"
            : "pointer-events-none opacity-0 -translate-y-2 max-h-0 lg:w-0"
        )}
      >
        {right}
      </div>
    </div>
  );
}
