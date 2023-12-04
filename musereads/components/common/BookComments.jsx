"use client";

import { calculateTimeAgoInMinutes } from "@/helper";
import {
  faPaperPlane,
  faThumbsUp,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { getserver } from "@/db/config";

export default function BookComments({ comment_data, bookTitle, bookid }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [InputValue, setInputValue] = useState("");
  const [FeedCommentId, setFeedCommentId] = useState();
  const [hydrated, setHydrated] = useState(false);

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };
  const handleSendInput = async (id) => {
    setFeedCommentId(id);
    const sendInput = await axios.post(`${getserver}/api/reply`, {
      userAccountId: status === "authenticated" ? session.user.id : null,
      commentId: id,
      reply: InputValue,
    });
    if (sendInput && sendInput.status === 200) {
      const recordFeed = await axios.post(`${getserver}/api/feed`, {
        userAccountId: status === "authenticated" ? session.user.id : null,
        action: "commented",
        commentId: id,
        bookid,
      });
      if (recordFeed && recordFeed.status === 200) {
        console.log("whhdhd");
        alert("Sent");
        // return router.reload();
        return router.replace(`${getserver}/book/${bookTitle}?id=${bookid}`);
      }
    }
    return alert("Oops! try again");
  };

  const calculateTimeAgo = (createdAt) => {
    return calculateTimeAgoInMinutes(new Date(createdAt));
  };
  React.useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <div suppressHydrationWarning className="flex overflow-auto flex-col">
      {comment_data && comment_data.length > 0
        ? comment_data.map(
            ({ comment, id, user_accounts, createdAt, replies }, index) => (
              <div
                key={index}
                className="flex border-b-2  border-museAction p-2  gap-4 "
              >
                <Avatar>
                  <FontAwesomeIcon icon={faUser} />
                </Avatar>
                <div className="flex w-full h-full flex-col gap-2">
                  <div className="flex  justify-between">
                    <h3 className="text-lg font-bold">
                      {user_accounts.fullname}
                    </h3>
                    <h3
                      suppressHydrationWarning
                      className="text-base font-bold"
                    >
                      <span>{calculateTimeAgo(createdAt)}</span>
                    </h3>
                  </div>
                  <p className="text-base">{comment}</p>
                  <div className="flex gap-3 items-center">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <CustomModal btn_title={"reply"} modal_title={"Reply"}>
                      <div className="flex items-center w-[30rem] gap-5 p-5">
                        <Avatar>
                          <FontAwesomeIcon icon={faUserAlt} />
                        </Avatar>
                        <Input
                          fullWidth
                          type={"text"}
                          onInput={(e) => handleInput(e)}
                        />
                        {InputValue != "" ? (
                          <div
                            onClick={() => handleSendInput(id, bookid)}
                            className="flex rounded-full p-3 hover:bg-museWhite cursor-pointer bg-museBg"
                          >
                            <FontAwesomeIcon size="sm" icon={faPaperPlane} />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </CustomModal>
                  </div>
                  <div className="flex flex-col  p-3">
                    {replies && replies.length > 0
                      ? replies.map(
                          ({ createdAt, reply, user_accounts }, index) => (
                            <UserReply
                              key={index}
                              reply_data={reply}
                              createdAt={createdAt}
                              reply_userdata={user_accounts}
                            />
                          )
                        )
                      : ""}
                  </div>
                </div>
              </div>
            )
          )
        : ""}
    </div>
  );
}

const UserReply = ({ reply_data, reply_userdata, createdAt }) => {
  return (
    <span className="flex border-l-2 border-museAction  gap-3 p-4">
      <Avatar>
        <FontAwesomeIcon icon={faUser} />
      </Avatar>
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between ">
          <h3 className="font-bold">{reply_userdata.fullname}</h3>
          <h3 className="text-base font-bold">
            {calculateTimeAgoInMinutes(new Date(createdAt))}
          </h3>
        </div>
        {reply_data}
      </div>
    </span>
  );
};
