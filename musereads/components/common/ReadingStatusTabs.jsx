import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Tab, Tabs } from "@mui/material";
import BookCardx from "./BookCardx";
import BookCard from "./BookCard";
import { useSession } from "next-auth/react";

export const ReadingStatusTabs = ({ data, userId }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { push } = router;
  const [value, setValue] = React.useState("1");
  const [selectedTab, setSelectedTab] = React.useState("currentlyReading");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredBooks =
    data &&
    data.filter((book) => {
      const userReading = book.user_readings.find(
        (reading) => reading.userAccountId === userId
      );
      if (userReading) {
        if (selectedTab === "currentlyReading") {
          if (
            userReading.pageReached > 0 &&
            userReading.wish_to_read === 0 &&
            userReading.done_reading === 0
          )
            return true;
        } else if (selectedTab === "toRead") {
          if (userReading.wish_to_read === 1) return true;
        } else if (selectedTab === "read") {
          if (userReading.done_reading === 1) return true;
        }
        return false;
      }
    });
  console.log(filteredBooks, " -dd");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={"w-full flex-1 flex-col flex"}>
      <div className="flex">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Reading status tabs"
        >
          <Tab label="Currently Reading" value="currentlyReading" />
          <Tab label="To Read" value="toRead" />
          <Tab label="Read" value="read" />
        </Tabs>
      </div>
      {data && data.length > 0 ? (
        <div className="flex  overflow-x-auto gap-4 p-5">
          {filteredBooks.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              session={status === "authenticated" ? session : null}
            />
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
