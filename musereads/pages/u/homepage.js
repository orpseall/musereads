import { GeneralLayout } from "@/components/layout";
import { SideBar } from "@/components/common/SideBar";
import React from "react";
import { SearchBar } from "@/components/common/SearchBar";
import { Feed } from "@/components/common/Feed";
import { CurrentlyReading } from "@/components/userhomepage/CurrentlyReading";
import { Recommended } from "@/components/userhomepage/Recommended";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { getserver } from "@/db/config";
import { getSession, useSession } from "next-auth/react";
import Bars from "@/components/common/Bars";

const homepage = ({ data, recommendation_data, sys_recommendation_data }) => {
  const { data: session, status } = useSession();

  return (
    <AuthWrapper>
      <GeneralLayout>
        <div className={"flex border-2 flex-col-reverse md:flex-row"}>
          <SideBar />
          <div className={"flex gap-2 md:pb-8 flex-col w-full md:w-[60%]"}>
            <div className={"md:px-24 px-5 py-2"}>
              <SearchBar />
            </div>
            <div className={" flex max-h-full"}>
              <div
                className={
                  "overflow-y-auto md:h-[40rem]  p-4 gap-5 flex flex-col w-full min-h-full"
                }
              >
                <CurrentlyReading
                  userId={status === "authenticated" ? session.user.id : null}
                  data={data ? data?.bookData : []}
                />
                <Recommended
                  sessionUser={
                    status === "authenticated" ? session.user.id : null
                  }
                  res_data={recommendation_data}
                  sys_recommend_data={sys_recommendation_data}
                />
              </div>
            </div>
          </div>
          <Feed />
          <div className="flex p-5 md:hidden">
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

  const sys_recommend = await fetch(
    `${getserver}/api/recommend/systemRecommended?userAccountId=${
      session ? session.user.id : null
    }`
  );
  const sys_recommendation_data = await sys_recommend.json();

  const res_recommend = await fetch(
    `${getserver}/api/recommend?userAccountId=${
      session ? session.user.id : null
    }`
  );
  const recommendation_data = await res_recommend.json();

  return {
    props: {
      data,
      recommendation_data: recommendation_data || [],
      sys_recommendation_data: sys_recommendation_data || [],
    },
  };
}

export default homepage;
