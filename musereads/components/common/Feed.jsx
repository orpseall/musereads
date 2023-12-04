import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React from "react";
import { UserProfile } from "./UserProfile";
import FeedComponent from "./FeedComponent";
import { useRouter } from "next/router";

export const Feed = () => {
  const router = useRouter();
  return (
    <div className={"flex flex-col md:w-[40%] bg-museWhite"}>
      <div className={"flex gap-4 flex-col borde-2"}>
        <div className={"flex flex-col p-4 items-end"}>
          <UserProfile />
        </div>
        <div
          className={
            "flex items-center p-4 justify-between border-b-2 border-[#D7D7D7]"
          }
        >
          <h3 className={"font-bold text-xl"}>FEED</h3>
          <Button
            onClick={() => router.push("/u/feed")}
            endIcon={<FontAwesomeIcon icon={faExpandAlt} />}
          >
            Expand
          </Button>
        </div>
      </div>
      <div
        className={"flex gap-4  flex-col items-center justify-center h-full"}
      >
        <FeedComponent />
      </div>
    </div>
  );
};
