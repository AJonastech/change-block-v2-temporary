"use client";
import { useEffect, useState } from "react";

const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState<boolean >(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);
  return isMounted;
};

export default useIsMounted;
