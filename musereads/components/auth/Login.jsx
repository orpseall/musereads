import { Button, Paper } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Logo } from "../common/Logo";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export const Login = () => {
  const router = useRouter();
  const { push } = router;
  const [Error, setError] = useState({});

  const handleLogin = async ({ email, password }) => {
    // console.log(Login_info)
    let sign_in_options = {
      email,
      password,
      role: "isUser",
      redirect: false,
      callbackUrl: `/auth/login`,
    };
    console.log(sign_in_options, "Sign IN");
    const res = await signIn("credentials", sign_in_options);
    console.log(res, "er");
    if (res.ok) return push("/u/explore");
    if (res.status === 401)
      return setError({
        isError: true,
        errMsg: "User not found / Password Incorrect",
      });
  };

  return (
    <div className={"flex flex-col flex-1 md:justify-center md:items-center"}>
      <div
        className={"flex max-w-md md:min-w-[30rem] gap-8 flex-col px-16 py-24"}
      >
        <div className={"flex flex-col justify-center items-center gap-2"}>
          <div className={" h-[3rem] flex"}>
            <Logo />
          </div>
          <span>
            {Error && Error.isError ? (
              <Paper sx={{ bgcolor: "red", p: ".5em", color: "white" }}>
                {Error.errMsg}
              </Paper>
            ) : (
              ""
            )}
          </span>
          <h3 className={"font-bold text-xl"}>SIGN IN</h3>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email || !values.password) {
              errors.email = "Email required";
              errors.password = "Password required";
            }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
              errors.email = "Invalid email address";
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleLogin(values);
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={"flex flex-col gap-4"}>
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
                placeholder="Password"
              />
              <ErrorMessage
                className={"text-[red]"}
                name="password"
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
          <span className="font-semibold cursor-pointer">
            forgot password ?
          </span>
          <span>
            Don't have an account ?{" "}
            <span
              onClick={() => push("/auth/signup")}
              className={"underline font-bold cursor-pointer"}
            >
              Create Account
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
