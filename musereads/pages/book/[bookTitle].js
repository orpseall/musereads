import { SearchBar } from "@/components/common/SearchBar";
import { SideBar } from "@/components/common/SideBar";
import { UserProfile } from "@/components/common/UserProfile";
import { GeneralLayout } from "@/components/layout";
import { useRouter } from "next/router";
import sampleImg from "@/public/img/sample.webp";
import Image from "next/image";
import {
  Avatar,
  Box,
  Button,
  Input,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { getserver } from "@/db/config";
import Link from "next/link";
import CustomModal from "@/components/common/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPaperPlane,
  faSearch,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import BookComments from "@/components/common/BookComments";
import AuthWrapper from "@/components/auth/AuthWrapper";
import Bars from "@/components/common/Bars";
import { UsersToRecommend } from "@/components/common/UsersToRecommend";

export default function ViewBook({ book_data, user_data }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { bookTitle, id } = router.query;
  const [book, setBook] = useState(book_data[0]);
  const [selectItem, setselectItem] = useState();
  const [RatingValue, setRatingValue] = useState(2);
  const [InputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setselectItem(typeof value === "string" ? value.split(",") : value);
  };
  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendInput = async (id) => {
    const sendInput = await axios.post(`${getserver}/api/comment`, {
      userAccountId: status === "authenticated" ? session.user.id : null,
      bookId: id,
      comment: InputValue,
    });
    if (sendInput.status === 200) {
      const recordFeed = await axios.post(`${getserver}/api/feed`, {
        userAccountId: status === "authenticated" ? session.user.id : null,
        action: "commented",
        bookId: id,
      });
      if (recordFeed && recordFeed.status === 200) {
        alert("Sent");
        return router.replace(`${getserver}/book/${bookTitle}?id=${id}`);
      }
    }
    return alert("Oops! try again");
  };

  return (
    <AuthWrapper>
      <GeneralLayout>
        <div className="flex h-screen">
          <SideBar />
          <div className="flex overflow-auto  min-h-screen flex-col w-full">
            <div className="flex gap-5 flex-col-reverse md:flex-row p-5 w-full">
              <SearchBar />
              <UserProfile />
              <Bars />
            </div>
            <div className="flex flex-col md:flex-row gap-5 p-5">
              <div className="flex flex-col gap-2">
                <div className="flex flex-1 h-60 max-w-[25rem]">
                  <img
                    className="w-full"
                    src={book.imgUrl}
                    alt={`${book.title}`}
                  />
                </div>
                <div className="flex flex-col">
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Typography component="legend">Rate this book:</Typography>
                    <Rating
                      name="book-rating"
                      value={RatingValue}
                      onChange={(event, newRating) => {
                        setRatingValue(newRating);
                      }}
                    />
                  </Box>
                </div>
                <FormControl className="w-full">
                  <InputLabel id="demo-multiple-checkbox-label">
                    BUY FROM
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={selectItem}
                    onChange={handleChange}
                    className="p-2"
                    size="small"
                    renderValue={(selected) => selected.join(", ")}
                  >
                    <MenuList>
                      {book.buylinks.filter(
                        (buylink) => buylink !== null && buylink !== undefined
                      ).length > 0
                        ? book.buylinks
                            .filter(
                              (buylink) =>
                                buylink !== null && buylink !== undefined
                            )
                            .map((buylink, index) => (
                              <MenuItem key={index}>
                                <Link href={buylink.url}>{buylink.title}</Link>
                              </MenuItem>
                            ))
                        : null}
                    </MenuList>
                  </Select>
                </FormControl>
              </div>
              <div className="flex gap-3 w-full flex-col">
                <h2 className="text-2xl font-bold">{bookTitle}</h2>
                <h3 className="text-lg">
                  by{" "}
                  {book.authors.length > 0
                    ? book.authors.map((author, index) => (
                        <span key={index}>{author.fullname}</span>
                      ))
                    : ""}
                </h3>
                <p className="flex gap-1">
                  <span className="font-semibold">Book detail:</span>{" "}
                  {book.pages} pages
                </p>
                <div className="flex gap-1">
                  <span className="text-base font-semibold">Genres:</span>
                  <ul className="flex gap-1">
                    {book.genres.length > 0
                      ? book.genres.map((genre, index) => (
                          <li key={index}>{genre.title},</li>
                        ))
                      : ""}
                  </ul>
                </div>
                <div className="flex gap-3 flex-col">
                  <div className="flex">
                    <CustomModal
                      modal_title={"Recommend Book"}
                      btn_title={"Recommend Book to:"}
                    >
                      <div className="flex gap-5 p-5 w-[30em] flex-col">
                        {/* <div className="flex items-center gap-3">
                          <Input fullWidth placeholder="search follower" />
                          <FontAwesomeIcon
                            className="p-3 rounded-full cursor-pointer hover:bg-museWhite bg-museBg"
                            icon={faSearch}
                            size="sm"
                          />
                        </div> */}
                        <h3 className="text-base">
                          If you followers they will show below:
                        </h3>
                        <UsersToRecommend book={book} user_data={user_data} />
                      </div>
                    </CustomModal>
                  </div>
                  <div className="flex ">
                    <CustomModal
                      modal_title={"Discuss"}
                      btn_title={"Discuss / leave a comment"}
                    >
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
                            onClick={() => handleSendInput(book.id)}
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
                </div>
                <div className="mt-5 flex flex-col h-full p-4  border-museAction  rounded-md">
                  <h3 className="font-semibold text-base">Description</h3>
                  <p>{book.description}</p>
                </div>
              </div>
            </div>
            <div
              suppressHydrationWarning
              className="p-3 gap-2 border-t-2  border-museAction  flex flex-col"
            >
              <h3 className="font-bold text-lg">Discussions</h3>
              <BookComments
                bookTitle={bookTitle}
                bookid={id}
                comment_data={book && book?.comments}
              />
            </div>
          </div>
        </div>
      </GeneralLayout>
    </AuthWrapper>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;
  const response = await fetch(`${getserver}/api/book/${id}`);
  const book_data = await response.json();
  const info_response = await fetch(`${getserver}/api/user/info`);
  const user_data = await info_response.json();
  return {
    props: {
      book_data,
      user_data,
    },
  };
}
