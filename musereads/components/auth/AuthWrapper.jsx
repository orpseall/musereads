import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

function AuthWrapper({ children }) {
  const router = useRouter();
  const { push } = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      push("/auth/login");
    },
  });
  if (session && status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center bg-musePrimary text-museBg h-[100vh]">
        <h1>Checking Authentication ...</h1>
      </div>
    );
  }
  return <>{children}</>;
}

export default AuthWrapper;
