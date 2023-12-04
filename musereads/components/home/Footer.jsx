import React from "react";

export const Footer = () => {
  return (
    <div
      className={
        "flex flex-col gap-8 justify-center items-center text-museWhite bg-museBlack p-8"
      }
    >
      <ul className={"flex flex-col md:flex-row gap-5 md:gap-16"}>
        <li>Privacy</li>
        <li>Terms of Service</li>
        <li>Books</li>
      </ul>
      <p>&copy; 2023 MuseReads</p>
    </div>
  );
};
