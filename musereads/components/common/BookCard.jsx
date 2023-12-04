import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import BasicSelect from "./BasicSelect";
import { MenuItem } from "@mui/material";
import AlertDialog from "./AlertDialog";
import { getserver } from "@/db/config";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function BookCard({ book, session }) {
  const router = useRouter();
  const { push } = router;
  return (
    <div className="flex gap-2 flex-col min-w-[15rem] max-w-[20rem]">
      {/* <a>Some text</a> */}
      <div
        onClick={() =>
          push({ pathname: `/book/${book.title}`, query: { id: book.id } })
        }
        className="cursor-pointer"
      >
        <div className="flex w-full max-h-[8rem] border-2">
          <img
            className="w-full object-contain"
            src={book.imgUrl}
            alt="sample book Image"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-sm">{book.title}</h3>
          <p className="text-xs">
            by {""}
            {book.authors.map((author, index) => (
              <span key={index}>
                {author.fullname}
                {book.authors.length > 1 ? "," : ""}{" "}
              </span>
            ))}
          </p>
          <ul className="flex flex-col text-sm font-semibold text-musePrimary">
            {session && book?.user_readings
              ? book.user_readings.length > 0
                ? book.user_readings
                    .filter((item) => item.userAccountId === session.user.id)
                    .map(({ done_reading, wish_to_read, pageReached }, index) =>
                      done_reading == 0 &&
                      wish_to_read === 0 &&
                      pageReached != 0 ? (
                        <li key={index}>Currently at page {pageReached}</li>
                      ) : done_reading == 1 && wish_to_read == 0 ? (
                        <li key={index}>Done Reading</li>
                      ) : done_reading == 0 && wish_to_read == 1 ? (
                        <li key={index}>In wish List</li>
                      ) : (
                        ""
                      )
                    )
                : []
              : null}
          </ul>
        </div>
      </div>
      <ReadOptions
        bookId={book.id}
        userAccountId={session && session.user.id}
      />
    </div>
  );
}

const ReadOptions = ({ bookId, userAccountId }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [Option, setOption] = useState(null);
  const handleSetOption = (value) => {
    setOption(value);
  };
  const handleSendRequest = async (pageReached) => {
    const results = await axios.post(`${getserver}/api/userReading`, {
      bookId,
      userAccountId,
      Option,
      pageReached,
    });

    if (results && results.status === 200) {
      const recordFeed = await axios.post(`${getserver}/api/feed`, {
        userAccountId: status === "authenticated" ? session.user.id : null,
        action: Option === 2 ? "set_to_done_reading" : "set_to_reading",
        bookId,
      });
      if (recordFeed.status === 200) {
        alert("Activity Set");
        return router.replace(`${getserver}/u/explore`);
      }
    }
    return alert(
      "OOps something went wrong/ either book's activity already set"
    );
  };
  const handleReadOptions = async () => {
    if (Option === 3) {
      const current_page_number = prompt(
        "What is the current page you are reading?"
      );
      if (current_page_number) {
        return await handleSendRequest(parseInt(current_page_number));
      }
    }
    return await handleSendRequest(0);
  };

  return (
    <>
      {Option !== null ? (
        <AlertDialog
          AlertTitle={`Confirm Activity`}
          BtnTitle={"Confirm Your Action"}
          AlertMsg={`Are you sure want to update Book's activity?`}
          AlertAction={handleReadOptions}
        />
      ) : (
        <BasicSelect selectTitle={"Activity"} action={handleSetOption}>
          <MenuItem value={1}>To Read</MenuItem>
          <MenuItem value={2}>Read</MenuItem>
          <MenuItem value={3}>Currently Reading</MenuItem>
        </BasicSelect>
      )}
    </>
  );
};
