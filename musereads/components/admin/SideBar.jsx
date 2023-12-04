import React from "react";
import CustomModal from "../common/CustomModal";
import AddBooks from "./AddBooks";
import AddGenre from "./AddGenre";
import AddAuthor from "./AddAuthor";
import AddBuyLinks from "./AddBuyLinks";

export default function SideBar({ data }) {
  return (
    <div className="flex flex-col p-5 bg-museWhite min-h-[100%] w-[15rem]">
      <h1 className="font-bold text-2xl p-5">MuseRead</h1>

      <ul className="flex flex-col gap-5 h-[100%]">
        <li className="flex flex-col">
          {data &&
          data?.genreData?.length > 0 &&
          data?.authorData?.length > 0 ? (
            <CustomModal btn_title={"Add Books"} modal_title={"Add Books"}>
              <AddBooks
                genre_data={data.genreData}
                author_data={data.authorData}
              />
            </CustomModal>
          ) : (
            <p>Add Genre and Authors first to enable AddBook</p>
          )}
        </li>
        <li className="flex flex-col">
          <CustomModal btn_title={"Add Genre"} modal_title={"Add Genre"}>
            <AddGenre />
          </CustomModal>
        </li>
        <li className="flex flex-col">
          <CustomModal btn_title={"Add Author"} modal_title={"Add Author"}>
            <AddAuthor />
          </CustomModal>
        </li>
        <li className="flex flex-col">
          {data && data?.bookData?.length > 0 ? (
            <CustomModal
              btn_title={"Add BuyLinks"}
              modal_title={"Add BuyLinks"}
            >
              <AddBuyLinks book_data={data.bookData} />
            </CustomModal>
          ) : (
            <p>Add a book first</p>
          )}
        </li>
        <li className="flex flex-col">
          <CustomModal btn_title={"Add Admin"} modal_title={"Add Admin"}>
            <p>hello</p>
          </CustomModal>
        </li>
      </ul>
    </div>
  );
}
