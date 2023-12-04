import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const FeedPage = () => {
  const { data: session, status } = useSession();
  const [follows, setFollows] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [followingFeeds, setFollowingFeeds] = useState([]);

  const fetchFollowData = async () => {
    try {
      const response = await fetch(
        `/api/follow?userAccountId=${session.user.id}`
      );
      if (response.status === 200) {
        const fetchedFollows = await response.json();
        setFollows(fetchedFollows);
        const feeds = await findFeedEntries(fetchedFollows);
        if (feeds && feeds.status === 200) {
          setFollowingFeeds(feeds);
          setLoading(false);
        }
      } else {
        console.error(`Failed to fetch follow data: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error fetching follow data: ${error}`);
    }
  };

  const findFeedEntries = async (fetchedFollows) => {
    const followedUserIds = fetchedFollows.map(
      ({ followingId }) => followingId
    );

    try {
      const response = await axios.get(
        `/api/feed?followUserId=${followedUserIds.join(",")}`
      );
      if (response && response.status === 200) {
        return setFollowingFeeds(response.data);
      }
    } catch (error) {
      console.error(`Error fetching feed entries: ${error}`);
      throw error;
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-2 overflow-auto border-[1px] border-[#DDDCD6]">
      <Button onClick={() => fetchFollowData()}>Load Feeds</Button>
      <ul className="flex flex-col gap-3 overflow-auto">
        {followingFeeds && followingFeeds.length > 0
          ? followingFeeds.map(
              ({ users, targetUser, comments, books, action }, index) => (
                <li key={index} className="flex p-2">
                  <div className="flex flex-1 items-center gap-1">
                    <Avatar>
                      <FontAwesomeIcon icon={faUser} />
                    </Avatar>
                    <div className="flex gap-1 flex-wrap text-sm">
                      {`${users.fullname} ${
                        action === "set_to_done_reading"
                          ? " finished reading"
                          : action === "set_to_reading"
                          ? " is reading"
                          : action === "commented"
                          ? " commented on"
                          : action === "liked"
                          ? " liked"
                          : action === "followed"
                          ? " followed"
                          : action === "recommended"
                          ? " recommended "
                          : ""
                      }`}
                      {books && <h3 className="font-bold">{books.title}</h3>}
                      {comments && (
                        <h3 className="font-bold">{comments.comment}</h3>
                      )}
                      {action === "recommended" && (
                        <h3 className="font-bold text-musePrimary">
                          {" "}
                          to {targetUser.fullname}
                        </h3>
                      )}
                    </div>
                  </div>
                </li>
              )
            )
          : ""}
      </ul>
    </div>
  );
};

export default FeedPage;
