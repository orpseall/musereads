"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar, Button } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export const UserProfile = () => {
  const { data: session, status } = useSession();
  const [ProfileOpen, setProfileOpen] = useState(false);

  if (status === "authenticated") {
    const { user } = session;
    return (
      <>
        <div
          onClick={() => setProfileOpen(true)}
          className={"flex gap-2 items-center text-base"}
        >
          <Avatar {...stringAvatar(user.name)} />
          <p>{user.name}</p>
        </div>
        <Dialog
          fullWidth
          onClose={() => setProfileOpen(false)}
          open={ProfileOpen}
        >
          <DialogTitle>Your Profile</DialogTitle>
          <DialogContent>
            <div className="flex flex-col gap-5">
              <Avatar>
                <FontAwesomeIcon icon={faUser} />
              </Avatar>
              <p className="flex p-2 bg-museBg">{user.name}</p>
              <p className="flex p-2 bg-museBg">{user.email}</p>
            </div>
            <Button onClick={() => setProfileOpen(false)}>Done</Button>
          </DialogContent>
        </Dialog>
      </>
    );
  }
};
