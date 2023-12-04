import { GeneralLayout } from "@/components/layout";
import { SideBar } from "@/components/common/SideBar";
import React from "react";
import { SearchBar } from "@/components/common/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownZA, faBars } from "@fortawesome/free-solid-svg-icons";
import { UserProfile } from "@/components/common/UserProfile";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { getserver } from "@/db/config";
import BookCard from "@/components/common/BookCard";
import { useSession } from "next-auth/react";
import Bars from "@/components/common/Bars";

const explore = ({ data }) => {
  const { data: session, status } = useSession();

  return (
    <AuthWrapper>
      <GeneralLayout>
        <div className={"flex h-full md:gap-5 md:pb-5 pb-4 flex-col w-full"}>
          <div
            className={
              "py-2 px-3 md:px-8 md:items-center flex-col-reverse md:flex-row justify-between gap-4 flex"
            }
          >
            <SearchBar />
            <UserProfile />
            <Bars />
          </div>
          <div className={"flex h-full"}>
            <SideBar />
            <div className={"p-3 flex flex-col w-full"}>
              <div className="flex items-center justify-between">
                <h3 className={"font-bold text-xl"}>Explore</h3>
                <span>
                  Popular List <FontAwesomeIcon icon={faArrowDownZA} />
                </span>
              </div>
              <div className="grid p-5 md:grid-cols-4 gap-5 overflow-auto md:max-h-[40rem] xl:max-h-full">
                {data && data?.bookData?.length > 0 ? (
                  data.bookData.map((book, index) => (
                    <BookCard
                      key={index}
                      book={book}
                      session={
                        status && status === "authenticated" ? session : null
                      }
                    />
                  ))
                ) : (
                  <p>Oops ! no books available - Books will be added soon ;)</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </GeneralLayout>
    </AuthWrapper>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${getserver}/api/admin/getAllData`);
  const data = await res.json();

  return { props: { data } };
}

export default explore;
