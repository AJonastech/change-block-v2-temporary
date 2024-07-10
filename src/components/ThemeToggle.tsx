"use client";
import { useTheme } from "next-themes";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Skeleton,
} from "@nextui-org/react";
import useIsMounted from "@/hooks/useIsMounted";
import { Moon, Sun } from "iconsax-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  const ThemeIcon = () => {
    return (
      <div className={`dark:text-white text-black`}>
        {theme === "light" ? <Sun variant="Bulk" /> : <Moon variant="Bulk" />}
      </div>
    );
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="bordered">
          <Skeleton className="rounded-md" isLoaded={isMounted as boolean}>
            <ThemeIcon />
          </Skeleton>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key: any) => setTheme(key)}
      >
        <DropdownItem key="light">light</DropdownItem>
        <DropdownItem key="dark">dark</DropdownItem>
        <DropdownItem key="system">default</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeToggle;
