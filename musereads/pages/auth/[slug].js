import React from "react";
import { Login } from "@/components/auth/Login";
import { SignUp } from "@/components/auth/SignUp";
import { useRouter } from "next/router";
import { GeneralLayout } from "@/components/layout";
import { getSession } from "next-auth/react";

const AuthenticationPage = ({ session }) => {
  const router = useRouter();
  const slug = router.query.slug;
  return (
    <GeneralLayout>
      {slug === "login" ? <Login /> : slug === "signup" ? <SignUp /> : null}
    </GeneralLayout>
  );
};

// redirect user if not loged in
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session)
    return {
      redirect: {
        destination: "/u/explore",
      },
    };

  return {
    props: { session },
  };
};

export default AuthenticationPage;
