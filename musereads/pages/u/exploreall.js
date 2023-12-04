import { GeneralLayout } from "@/components/layout";
import { SideBar } from "@/components/common/SideBar";
import React from "react";
import { SearchBar } from "@/components/common/SearchBar";
import { Feed } from "@/components/common/Feed";
import { CurrentlyReading } from "@/components/userhomepage/CurrentlyReading";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { getserver } from "@/db/config";
import { getSession, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bars from "@/components/common/Bars";
import { useRouter } from "next/router";
import { UserProfile } from "@/components/common/UserProfile";
import { ReadingStatusTabs } from "@/components/common/ReadingStatusTabs";

const homepage = ({ data, recommendation_data }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <AuthWrapper>
      <GeneralLayout>
        <div
          className={"flex border-2 p-0 flex-col-reverse md:flex-row flex-1"}
        >
          <div
            className={
              "border-2  flex min-h-full gap-2 md:gap-8 flex-col w-full"
            }
          >
            <div
              className={
                "flex flex-col-reverse md:flex-row md:px-24 justify-between px-2 gap-3 py-4"
              }
            >
              <SearchBar />
              <UserProfile />
            </div>
            <div className={"flex h-full"}>
              <SideBar />
              <div
                className={"p-4 gap-5 flex flex-col w-full overflow-y-auto "}
              >
                <ReadingStatusTabs
                  data={data ? data?.bookData : []}
                  userId={status === "authenticated" ? session.user.id : null}
                />
              </div>
            </div>
          </div>
          <div className="flex border-2 just h-full md:hidden p-4 ">
            <Bars />
          </div>
        </div>
      </GeneralLayout>
    </AuthWrapper>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const res = await fetch(`${getserver}/api/admin/getAllData`);
  const data = await res.json();
  const res_recommend = await fetch(
    `${getserver}/api/recommend?userAccountId=${
      session ? session.user.id : null
    }`
  );
  const recommendation_data = await res_recommend.json();

  return { props: { data, recommendation_data } };
}

export default homepage;
