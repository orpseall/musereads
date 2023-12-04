import { getserver } from "@/db/config";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const UsersToRecommend = ({ user_data, book }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // followingId is the account user want to follow or user is following
  const handleRecommend = async (targetUserId) => {
    const recommend_request = await axios.post(`${getserver}/api/recommend`, {
      userAccountId: status === "authenticated" ? session.user.id : null,
      targerUserId: targetUserId,
      bookId: book.id,
    });
    if (recommend_request && recommend_request.status === 200) {
      const recordFeed = await axios.post(`${getserver}/api/feed`, {
        userAccountId: status === "authenticated" ? session.user.id : null,
        action: "recommended",
        bookId: book.id,
        targetUserId,
      });
      if (recordFeed && recordFeed.status === 200) {
        alert("Recommendation done");
        return router.replace(`${getserver}/book/${book.title}?id=${id}`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-col  w-full p-3">
        {status === "authenticated" &&
          user_data &&
          user_data.map(({ id, role, followers }, outerIndex) => {
            if (role !== "isAdmin" && id === session.user.id) {
              return followers?.map(({ fullname, userAccount }, innerIndex) => (
                <li key={innerIndex} className="flex w-full">
                  <div className="flex flex-1  justify-between items-center">
                    <div className="flex w-full items-center p-3 gap-2">
                      <Avatar>
                        <FontAwesomeIcon icon={faUser} />
                      </Avatar>
                      <span>{userAccount.fullname}</span>
                    </div>
                    <Button onClick={() => handleRecommend(userAccount.id)}>
                      Recommend
                    </Button>
                  </div>
                </li>
              ));
            }
            return null; // If the condition is not met, return null
          })}
      </ul>
    </div>
  );
};

// const isFollowing = followers.some(
//   (follower) => follower.followingId === session.user.id
// );
// const user_followers = followers.map((follower) => follower);
// console.log(isFollowing, know, "---");
// const buttonText = isFollowing
//   ? "Your Follower"
//   : "Not Following you";

// <span>
//                       {isFollowing ? (
//                         <Button>Recommend</Button>
//                       ) : (
//                         <Button onClick={() => handleFollowRequest(id)}>
//                           {/* {buttonText} */} ok
//                         </Button>
//                       )}
//                     </span>
