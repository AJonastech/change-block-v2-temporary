import GeneratedEmpa from "@/components/GeneratedEmpa";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function page() {
  return (
    <main className="w-full min-h-full bg-white overflow-auto rounded-xl no-scrollbar flex flex-col gap-10  p-9 py-12   ">
      <div className="flex justify-between items-center">
        <h6 className="heading-h6 font-semibold font-generalSans text-grey-700">
          EMPA Generator
        </h6>
        <Link href="/EMPA/generate">
          <Button
          aria-label="Generate EMPA"
            size="lg"
            className="font-medium text-grey-20 px-6 py-4 lg:text-lg"
            color="primary"
          >
            Generate EMPA
          </Button>
        </Link>
      </div>
      <GeneratedEmpa />
    </main>
  );
}
