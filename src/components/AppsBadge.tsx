"use client";

import { AppsIcon } from "@/icons";
import useIsMounted from "@/hooks/useIsMounted";

import { ArrowRight2 } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AppsBadge = () => {
  const isMounted = useIsMounted();
  const router = usePathname();
  const currentPath = router?.split("/")[1];
  const currentApp = currentPath?.split("-").join(" ");
  
  return (
    <div className="flex gap-3 w-fit  not-prose h-fit  justify-center items-center sm:gap-2">
      <span className="hover:cursor-pointer  rounded-full px-4 sm:px-3 sm:text-sm py-1.5 font-Satoshi font-normal bg-secondary fw-fit h-full">
        <Link
          className="flex  justify-start items-center gap-2 hover:cursor-pointer"
          href="/"
        >
          <AppsIcon /> Apps
        </Link>
      </span>
      <ArrowRight2 size={18} />
      <span className="rounded-full py-1.5 font-Satoshi font-bold text-black-500 sm:text-sm capitalize">
        {isMounted && (currentApp as unknown as string)}
      </span>
    </div>
  );
};

export default AppsBadge;
