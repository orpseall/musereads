import { faBookAtlas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Logo } from "../common/Logo";

export const Header = () => {
  return (
    <div className="flex text-musePrimary">
      <div className="h-[3rem] flex">
        <Logo />
      </div>
    </div>
  );
};
