import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getserver } from "@/db/config";
import axios from "axios";
import BookCardx from "./BookCardx";

export const SearchBar = () => {
  const [SearchTxt, setSearchTxt] = useState(null);
  const [SearchResult, setSearchResult] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSearch = async () => {
    if (SearchTxt != null) {
      const res = await axios.get(
        `${getserver}/api/search?SearchTxt=${SearchTxt}`
      );
      if (res && res.status === 200) {
        setSearchResult(res?.data.results);
        return setOpen(true);
      }
      return alert("Search Results not matching...");
    }
    return alert("Search box can't be empty! ");
  };
  return (
    <>
      <div className={"flex items-center gap-2 flex-1"}>
        <TextField
          variant={"outlined"}
          sx={{ paddingLeft: "1em" }}
          fullWidth
          type="text"
          onInput={(e) => setSearchTxt(e.target.value)}
          placeholder="Search book name or author"
        />
        <FontAwesomeIcon
          onClick={() => handleSearch()}
          icon={faSearch}
          className="bg-museWhite hover:bg-museBg hover:cursor-pointer hover:shadow-md p-3 rounded-full"
        />
      </div>
      <Dialog fullWidth onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Reseach Results</DialogTitle>
        <DialogContent>
          <div className="grid grid-rows-2 gap-5 md:grid-cols-2">
            {SearchResult &&
              SearchResult.map((book, index) => (
                <BookCardx book={book} key={index} />
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
