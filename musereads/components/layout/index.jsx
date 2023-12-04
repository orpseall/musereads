import React, { useEffect, useState } from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const GeneralLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <main
      className={`flex  bg-museBg min-h-screen flex-col ${inter.className}`}
    >
      {children}
    </main>
  );
};
