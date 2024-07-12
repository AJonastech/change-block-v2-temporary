import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Sidebar from "@/components/Sidebar";
import localFont from 'next/font/local'
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });


const generalSans = localFont({
  src: [
    {
      path: "../fonts/generalSans/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/generalSans/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal"
    },

    {
      path: "../fonts/generalSans/GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal"
    },
    {
      path: "../fonts/generalSans/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal"
    },

  ],
  variable: "--font-general-sans",
})


const satoshi = localFont({
  src: [
    {
      path: "../fonts/satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal"
    },
    {
      path: "../fonts/satoshi/Satoshi-Bold.otf",
      weight: "700",
      style: "normal"
    },

  ],
  variable: "--font-satoshi",

})

export const metadata: Metadata = {
  title: "Changeblock",
  description: "Generated by changeblock",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${generalSans.variable} ${satoshi.variable} bg-background   `}>
        <Providers>
          <div className="flex !max-w-screen relative   !min-w-full  w-full h-screen  p-[1rem] max-h-screen prose  ">
            <Suspense>
              <Sidebar />
            </Suspense>

            <div className=" px-[1rem] overflow-auto    max-h-full bg-background  w-full flex flex-col gap-[2rem]  overflow-x-hidden ">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
