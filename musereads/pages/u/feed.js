import { SearchBar } from "@/components/common/SearchBar";
import { SideBar } from "@/components/common/SideBar";
import { UserProfile } from "@/components/common/UserProfile";
import { GeneralLayout } from "@/components/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import { getserver } from "@/db/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import FeedPage from "@/components/common/FeedPage";
import Bars from "@/components/common/Bars";

export default function Feed({ user_data }) {
  //   const { data: session, status } = useSession();
  const [InputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setselectItem(typeof value === "string" ? value.split(",") : value);
  };
  console.log(user_data);
  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <AuthWrapper>
      <GeneralLayout>
        <div className="flex h-screen">
          <SideBar />
          <div className="flex overflow-auto  min-h-screen flex-col w-full">
            <div className="flex gap-5 md:flex-row flex-col-reverse p-5 w-full">
              <SearchBar />
              <UserProfile />
              <Bars />
            </div>
            <div className="flex  flex-col md:flex-row h-full overflow-auto gap-5 p-5">
              <div className="flex w-full flex-1 flex-col  p-2">
                <h3 className="text-lg font-bold">FEED</h3>
                <div className="flex gap-4 flex-col flex-1 md:p-8">
                  <FeedPage />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ background: "#333 !important" }}
                  >
                    Invite friends and family to join you on musereads
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ background: "#4653C9 !important" }}
                  >
                    Add facebook friends
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ background: "#D29000 !important" }}
                  >
                    Connect contacts
                  </Button>
                </div>
              </div>
              <div className="flex flex-col flex-1 rounded-xl border-[#DDDCD6] border-[2px] p-2">
                {user_data && user_data.length <= 0 ? (
                  <p className="flex p-5 text-lg self-center">
                    You are not following any body yet !
                  </p>
                ) : (
                  <div className="flex flex-col pt-5 h-full overflow-auto">
                    <AllUsers user_data={user_data} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </GeneralLayout>
    </AuthWrapper>
  );
}

const AllUsers = ({ user_data }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userToFollow, setuserToFollow] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  // followingId is the account user want to follow or user is following
  const handleFollowRequest = async (followingId) => {
    setuserToFollow(followingId);
    const follow_results = await axios.post(`${getserver}/api/follow`, {
      userAccountId: status === "authenticated" ? session.user.id : null,
      followingId,
    });
    if (follow_results.status === 200) {
      const recordFeed = await axios.post(`${getserver}/api/feed`, {
        userAccountId: status === "authenticated" ? session.user.id : null,
        targetUserId: followingId,
        action: "followed",
      });
      if (recordFeed.status === 200) {
        alert("Follow sent");
        return router.replace(`${getserver}/u/feed`);
      }
    }
    return alert("Oops! try again");
  };

  // Filter user data based on search input
  const filteredUsers = user_data.filter(({ fullname }) =>
    fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex p-2 flex-col h-[100%] gap-5">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        className="flex border-none outline-none p-2"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="flex flex-col gap-5">
        {status === "authenticated" &&
          filteredUsers.map(({ fullname, id, role, followers }, index) => {
            {
              /* user_data &&
          user_data.map(({ fullname, id, role, followers }, index) => { */
            }
            if (role !== "isAdmin" && id !== session.user.id) {
              const isFollowing = followers.some(
                (follower) => follower.userAccountId === session.user.id
              );

              const buttonText = isFollowing ? "FOLLOWING" : "Follow";

              return (
                <li className="flex justify-between items-center" key={index}>
                  <span className="flex gap-3 items-center">
                    <Avatar>
                      <FontAwesomeIcon icon={faUser} />
                    </Avatar>
                    <span>{fullname}</span>
                  </span>
                  <span>
                    {isFollowing ? (
                      <Button disabled>{buttonText}</Button>
                    ) : (
                      <Button onClick={() => handleFollowRequest(id)}>
                        {buttonText}
                      </Button>
                    )}
                  </span>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(`${getserver}/api/user/info`);
  const user_data = await response.json();
  return {
    props: {
      user_data,
    },
  };
}
