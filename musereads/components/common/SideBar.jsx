import {
  faBookOpen,
  faHome,
  faNewspaper,
  faQuestion,
  faSignOut,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export const SideBar = () => {
  const router = useRouter();
  const { push } = router;
  return (
    <div
      className={
        "p-8 min-h-full hidden md:flex border-r-2 border-[#D7D7D7] text-2xl md:items-center md:justify-center flex-col gap-8"
      }
    >
      <ul className={"flex gap-8 flex-col items-center justify-center"}>
        <li onClick={() => push("/u/homepage")}>
          <Tooltip title={"Home"}>
            <FontAwesomeIcon
              className={
                "hover:bg-musePrimary hover:cursor-pointer hover:text-museWhite shadow-lg hover:translate-x-2 p-3 rounded-full"
              }
              icon={faHome}
            />
          </Tooltip>
        </li>
        <li onClick={() => push("/u/explore")}>
          <Tooltip title={"Explore"}>
            <FontAwesomeIcon
              className={
                "hover:bg-musePrimary hover:cursor-pointer hover:text-museWhite shadow-lg hover:translate-x-2 p-3 rounded-full"
              }
              icon={faBookOpen}
            />
          </Tooltip>
        </li>
        <li onClick={() => push("/u/feed")}>
          <Tooltip title={"Feed"}>
            <FontAwesomeIcon
              className={
                "hover:bg-musePrimary hover:cursor-pointer hover:text-museWhite shadow-lg hover:translate-x-2 p-3 rounded-full"
              }
              icon={faNewspaper}
            />
          </Tooltip>
        </li>
      </ul>
      <div className={"flex  items-center justify-center"}>
        <FontAwesomeIcon
          icon={faSliders}
          className={"bg-[#BDBDBD54] p-3 rounded-full cursor-pointer"}
        />
      </div>
      <div className={"flex  items-center justify-center"}>
        <Tooltip title={"Q&A"}>
          <FontAwesomeIcon
            icon={faQuestion}
            className={"bg-[#BDBDBD54] p-3 rounded-full cursor-pointer"}
          />
        </Tooltip>
      </div>
      <div className={"flex  items-center justify-center"}>
        <Tooltip title={"LogOut"}>
          <FontAwesomeIcon
            icon={faSignOut}
            className={
              "bg-[#d61414bc] text-museWhite p-3 rounded-full cursor-pointer"
            }
            onClick={() => signOut()}
          />
        </Tooltip>
      </div>
    </div>
  );
};
