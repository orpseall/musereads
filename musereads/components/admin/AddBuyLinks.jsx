import { getserver } from "@/db/config";
import { Button, MenuItem, Checkbox, ListItemText } from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import CustomModal from "../common/CustomModal";
import MultipleSelectCheckmarks from "../common/MultiSelect";
import AddBooks from "./AddBooks";

export default function AddBuyLinks({ book_data }) {
  const [selectedBook, setSelectedBook] = useState([]);

  const handleAddBuyLink = async (values) => {
    console.log({ ...values, selectedBook });
    if (selectedBook.length > 0) {
      const selectedBookId = book_data
        .filter((book) => selectedBook.includes(book.title))
        .map((book) => book.id);

      const results = await axios.post(`${getserver}/api/buylinks`, {
        ...values,
        bookId: selectedBookId,
      });
      if (results && results.status === 200)
        return alert("Done Saving Book Buy Link");
    }
    return alert("Must select a book");
  };
  const handleSelectedBook = (value) => {
    setSelectedBook((prev) => value);
  };

  return (
    <div>
      <Formik
        initialValues={{ title: "", url: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.title || !values.url) {
            errors.title = "title required";
            errors.url = "url required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleAddBuyLink(values);
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
              type={"text"}
              name="url"
              placeholder="url"
            />
            <ErrorMessage className={"text-[red]"} name="url" component="div" />
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
      {book_data ? (
        <MultipleSelectCheckmarks
          selectLabel={"Select Book"}
          getData={handleSelectedBook}
        >
          {book_data.map(({ id, title }) => (
            <MenuItem key={id} value={title}>
              <ListItemText primary={title} />
            </MenuItem>
          ))}
        </MultipleSelectCheckmarks>
      ) : (
        <div>
          <p className="text-[red]">No Book available</p>
          <CustomModal btn_title={"Add AddBook"} modal_title={"Add Book"}>
            <AddBooks />
          </CustomModal>
        </div>
      )}
    </div>
  );
}
