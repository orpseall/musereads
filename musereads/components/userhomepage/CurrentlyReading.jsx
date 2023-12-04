import { Button } from "@mui/material";
import React from "react";
import BookCardx from "../common/BookCardx";
import { useRouter } from "next/router";

export const CurrentlyReading = ({ data, userId }) => {
  const router = useRouter();
  const { push } = router;

  const filteredBooks =
    data &&
    data.filter((book) => {
      const userReading = book.user_readings.find(
        (reading) => reading.userAccountId === userId
      );
      if (userReading) {
        if (userReading.wish_to_read === 0 && userReading.done_reading === 1)
          return false; // Skip the book if the user has already read it
        if (userReading.wish_to_read === 1 && userReading.done_reading === 0)
          return false; // Skip the book if the user has wish to read read it
        if (
          userReading.pageReached > 0 &&
          userReading.wish_to_read === 0 &&
          userReading.done_reading === 0
        )
          return true; // Add the book if the user has reached page 1 or greater
      }
    });

  return (
    <div className={"w-full flex-col flex"}>
      <div className={"flex items-center justify-between"}>
        <h2 className={"font-bold text-xl"}>Currently Reading</h2>
        <Button size="small" onClick={() => router.push("/u/exploreall")}>
          View all
        </Button>
      </div>
      {filteredBooks && filteredBooks.length > 0 ? (
        <div className="flex m-2 overflow-x-auto gap-4 p-5">
          {filteredBooks.map((book, index) => (
            <BookCardx key={index} book={book} />
          ))}
        </div>
      ) : (
        <div
          className={"flex gap-4 items-center flex-col justify-center h-full"}
        >
          <p className={"text-lg"}>You don't have any books here</p>
          <Button
            sx={{ backgroundColor: "#636429 !important" }}
            variant="contained"
            onClick={() => push("/u/explore")}
          >
            Start Reading
          </Button>
        </div>
      )}
    </div>
  );
};
