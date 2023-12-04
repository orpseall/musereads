import React from "react";
import { Footer } from "@/components/home/Footer";
import { Button } from "@mui/material";
import { Header } from "@/components/home/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { GeneralLayout } from "@/components/layout";

// resource
import BgImg from "@/public/img/home.png";

export default function Home() {
  const { push } = useRouter();

  return (
    <GeneralLayout>
      <div className={"flex flex-col md:flex-row flex-1 h-[80%]"}>
        <div className="flex md:w-[60%] flex-col gap-8 md:px-16 p-5 py-8">
          <Header />
          <div
            className={
              "flex  flex-col  md:p-5 lg:p-16 max self-center justify-self-center gap-4 "
            }
          >
            <h1
              className={"font-bold text-musePrimary max-lg:text-3xl text-7xl"}
            >
              MUSEREADS
            </h1>
            <h2 className="font-bold text-lg md:text-2xl">
              Discover Africa, One Book at a Time
            </h2>
            <ul className="flex text-lg gap-1 flex-col">
              <li>
                <FontAwesomeIcon icon={faCheckCircle} /> Easily discover fiction
                books by genre and country
              </li>
              <li>
                <FontAwesomeIcon icon={faCheckCircle} /> Keep track of your
                reading activity
              </li>
              <li>
                <FontAwesomeIcon icon={faCheckCircle} /> Get personalized
                recommendations
              </li>
              <li>
                <FontAwesomeIcon icon={faCheckCircle} /> Engage in discussions
                with friends & family
              </li>
            </ul>
            <div className="gap-4 py-4 flex">
              <Button
                sx={{
                  backgroundColor: "#636429 !important",
                }}
                variant="contained"
                onClick={() => push("/auth/signup")}
              >
                sign up
              </Button>
              <Button
                sx={{
                  color: "#636429 !important",
                  borderColor: "#636429 !important",
                }}
                variant="outlined"
                onClick={() => push("/auth/login")}
              >
                sign in
              </Button>
            </div>
          </div>
        </div>
        <div className="flex md:w-[40%]">
          <Image
            src={BgImg}
            className="w-full object-cover"
            alt="books aligned background"
            priority
          />
        </div>
      </div>
      <Footer />
    </GeneralLayout>
  );
}
