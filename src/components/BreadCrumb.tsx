"use client";

import { AppsIcon } from "@/icons";
import useIsMounted from "@/hooks/useIsMounted";
import { ArrowRight2 } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const capitalizeWords = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BreadCrumb = () => {
  const isMounted = true; //useIsMounted()
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex gap-3 w-fit not-prose h-fit shrink-0 grow-0 justify-center items-center sm:gap-2">
      <span className="hover:cursor-pointer rounded-full px-4 sm:px-3 sm:text-sm py-1.5 font-Satoshi font-normal bg-secondary flex-none">
        <Link
          className="flex justify-start items-center gap-2 hover:cursor-pointer"
          href="/"
        >
          <AppsIcon /> Apps
        </Link>
      </span>
      {isMounted &&
        pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return (
            <Fragment key={index}>
              <ArrowRight2 size={18} className="flex-none" />
              <span
                className={`rounded-full py-1.5 font-satoshi ${
                  isLast
                    ? "font-semibold text-grey-700 text-lg"
                    : "font-normal text-grey-500"
                } capitalize flex-none`}
              >
                {isLast ? (
                  capitalizeWords(segment)
                ) : (
                  <Link href={href} className="hover:cursor-pointer">
                    {capitalizeWords(segment)}
                  </Link>
                )}
              </span>
            </Fragment>
          );
        })}
    </div>
  );
};

export default BreadCrumb;
