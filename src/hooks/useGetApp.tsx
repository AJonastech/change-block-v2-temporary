import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

function useGetApp() {
    const pathName = usePathname();
    const searchParameters = useSearchParams()
    const data = searchParameters.get("data")
    const section = searchParameters.get("section")
    const currentPath = pathName?.split("/")[1];
    const currentApp = currentPath?.split("-").join(" ");
  return {currentApp, data, section, currentPath, pathName}
}

export default useGetApp