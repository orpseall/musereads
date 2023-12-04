import { getserver } from "@/db/config";
import { Button } from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";

export default function AddAuthor() {
  const router = useRouter();

  const handleAddAuthor = async (values) => {
    const results = await axios.post(`/api/author`, values);
    if (results && results.status === 200) {
      alert("Author Saved");
      return router.replace(router.asPath);
    }
  };

  return (
    <Formik
      initialValues={{ fullname: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.fullname) {
          errors.fullname = "fullname required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleAddAuthor(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={"flex flex-col gap-4 p-10 w-[25rem]"}>
          <Field
            className={"flex-1 rounded-xl px-4 py-3 outline-none shadow-lg"}
            type="fullname"
            name="fullname"
            placeholder="fullname"
          />
          <ErrorMessage
            className={"text-[red]"}
            name="fullname"
            component="div"
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
  );
}
