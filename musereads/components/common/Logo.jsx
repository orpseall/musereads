import React from "react";
import MuseLogo from "@/public/logo_svg/logo-no-background.svg";
import Image from "next/image";

export const Logo = () => {
  return (
    <Image className="w-full object-contain" src={MuseLogo} alt="muse logo" />
  );
};
