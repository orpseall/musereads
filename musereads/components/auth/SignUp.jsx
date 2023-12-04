import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Logo } from "../common/Logo";
import { useRouter } from "next/router";

export const SignUp = () => {
  // const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const { push } = router;

  const handleRegister = async (data) => {
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    const response = await res.json();
    if (res.ok && response) {
      return alert("Accounted Created");
    } else {
      return setIsSaved(true);
    }
  };

  return (
    <div className={"flex flex-col flex-1 justify-center items-center"}>
      <div
        className={"flex max-w-md md:min-w-[30rem] gap-8 flex-col px-16 py-24"}
      >
        <div className={"flex flex-col justify-center items-center gap-2"}>
          {/* <p>{isSaved ? "Account Registered Successfully" : "Error"}</p> */}
          <div className={" h-[3rem] flex"}>
            <Logo />
          </div>
          <h3 className={"font-bold text-xl"}>SIGN UP</h3>
        </div>
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            role: "",
            ban: 0,
            role: "isUser",
            confirmpassword: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email || !values.password || !values.fullname) {
              errors.email = "Email required";
              errors.password = "Password required";
              errors.fullname = "fullname required";
            }
            if (values.password !== values.confirmpassword)
              errors.confirmpassword = "Password do not match!";
            if (values.password.length < 6)
              errors.password = "Password should have at least 6 Characters";
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
              errors.email = "Invalid email address";
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleRegister(values);
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={"flex flex-col gap-4"}>
              <Field
                className={"flex-1 rounded-xl px-4 py-3 outline-none shadow-lg"}
                type="text"
                name="fullname"
                placeholder="First & Last name"
              />
              <ErrorMessage
                className={"text-[red]"}
                name="fullname"
                component="div"
              />
              <Field
                className={"flex-1 rounded-xl px-4 py-3 outline-none shadow-lg"}
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                className={"text-[red]"}
                name="email"
                component="div"
              />
              <Field
                className={"flex-1 rounded-xl px-4 py-3 outline-none shadow-lg"}
                type="password"
                name="password"
                placeholder="Password - at least 6 characters"
              />
              <Field
                className={"flex-1 rounded-xl px-4 py-3 outline-none shadow-lg"}
                type="password"
                name="confirmpassword"
                placeholder="confirm password"
              />
              <ErrorMessage
                className={"text-[red]"}
                name="password"
                component="div"
              />
              <ErrorMessage
                className={"text-[red]"}
                name="confirmpassword"
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
        <div className={"flex flex-col"}>
          <span>
            Already have an account ?{" "}
            <span
              onClick={() => push("/auth/login")}
              className={"underline font-bold cursor-pointer"}
            >
              Sign in
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
