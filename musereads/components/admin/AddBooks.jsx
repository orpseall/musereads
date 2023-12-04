import { getserver } from "@/db/config";
import {
  Button,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import CustomModal from "../common/CustomModal";
import AddGenre from "./AddGenre";
import MultipleSelectCheckmarks from "../common/MultiSelect";
import AddAuthor from "./AddAuthor";
import { UploadImage } from "@/helper";

export default function AddBooks({ genre_data, author_data }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [file, setFile] = useState(null);

  const handleAddBook = async (values) => {
    if (selectedGenres.length > 0 && selectedAuthors.length > 0 && file) {
      const selectedGenreIds = await genre_data
        .filter((genre) => selectedGenres.includes(genre.title))
        .map((genre) => genre.id);

      const selectedAuthorIds = await author_data
        .filter((author) => selectedAuthors.includes(author.fullname))
        .map((author) => author.id);

      const file_data = await UploadImage(file);
      // console.log(file, file_data, " --data");
      if (file_data.done) {
        const { imgUrl, imgData } = file_data;
        const results = await axios.post(`${getserver}/api/book`, {
          book: { ...values, imgUrl },
          genreIds: selectedGenreIds,
          authorIds: selectedAuthorIds,
        });

        if (results && results.status === 200) return alert("Done Saving Book");
      }
    }
    return alert("Must select a genre and author");
  };
  const handleSelectedGenres = (value) => {
    setSelectedGenres((prev) => value);
  };

  const handleSelectedAuthors = (value) => {
    setSelectedAuthors((prev) => value);
  };

  return (
    <div>
      <Formik
        initialValues={{ title: "", pages: 0, description: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.title || !values.pages || !values.description) {
            errors.title = "title required";
            errors.pages = "pages required";
            errors.description = "description required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleAddBook(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={"flex flex-col gap-4 p-10 w-[25rem]"}>
            <Field
              className={"flex-1 rounded-xl px-4 py-3 outline-none shadow-lg"}
              type="title"
              name="title"
              placeholder="title"
            />
            <ErrorMessage
              className={"text-[red]"}
              name="title"
              component="div"
            />
            <Field
              className={"flex-1 rounded-xl px-4 py-3 outline-none shadow-lg"}
              type={"number"}
              name="pages"
              placeholder="pages"
            />
            <ErrorMessage
              className={"text-[red]"}
              name="pages"
              component="div"
            />
            <Field
              as="textarea"
              className={"flex-1 rounded-xl px-4 py-3 outline-none shadow-lg"}
              type={"text"}
              name="description"
              placeholder="description"
            />
            <ErrorMessage
              className={"text-[red]"}
              name="description"
              component="div"
            />
            <TextField
              variant="standard"
              id="file"
              helperText="Book Image"
              fullWidth
              name="file"
              type="file"
              onChange={(event) => {
                setFile(event.currentTarget.files[0]);
                console.log(event.currentTarget.files[0]);
              }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#636429 !important" }}
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {file && (
        <div className="flex max-h-[15em] max-w-[15em]">
          <img
            className="w-full object-contain"
            src={URL.createObjectURL(file)}
            alt="book img"
          />
        </div>
      )}
      {genre_data ? (
        <MultipleSelectCheckmarks
          selectLabel={"Select Genres"}
          getData={handleSelectedGenres}
        >
          {genre_data.map(({ id, title }) => (
            <MenuItem key={id} value={title}>
              <ListItemText primary={title} />
            </MenuItem>
          ))}
        </MultipleSelectCheckmarks>
      ) : (
        <div>
          <p className="text-[red]">No Genre available</p>
          <CustomModal btn_title={"Add Genre"} modal_title={"Add Genre"}>
            <AddGenre />
          </CustomModal>
        </div>
      )}
      {author_data ? (
        <MultipleSelectCheckmarks
          selectLabel={"Select Author"}
          getData={handleSelectedAuthors}
        >
          {author_data.map(({ id, fullname }) => (
            <MenuItem key={id} value={fullname}>
              <ListItemText primary={fullname} />
            </MenuItem>
          ))}
        </MultipleSelectCheckmarks>
      ) : (
        <div>
          <p className="text-[red]">No Genre available</p>
          <CustomModal btn_title={"Add Genre"} modal_title={"Add Genre"}>
            <AddAuthor />
          </CustomModal>
        </div>
      )}
    </div>
  );
}
