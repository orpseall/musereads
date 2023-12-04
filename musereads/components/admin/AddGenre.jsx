import { getserver } from "@/db/config";
import { Button } from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";

export default function AddGenre() {
  const router = useRouter();

  const handleAddGenre = async (values) => {
    const results = await axios.post(`/api/genre`, values);
    if (results && results.status === 200) {
      alert("Genre Saved");
      return router.replace(router.asPath);
    }
  };

  return (
    <Formik
      initialValues={{ title: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "title required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleAddGenre(values);
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
          <ErrorMessage className={"text-[red]"} name="title" component="div" />
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
  );
}
