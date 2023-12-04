import React from "react";
import { RecommendedBooks } from "../common/RecommendedBooks";

export const Recommended = ({ res_data, sessionUser, sys_recommend_data }) => {
  const filteredResData = res_data.filter(
    ({ targetUserId }) => targetUserId !== sessionUser
  );
  return (
    <div className="flex-col h-[20rem] flex p-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">Recommended</h2>
      </div>
      {sys_recommend_data?.length > 0 || filteredResData.length > 0 ? (
        <RecommendedBooks
          sys_recommend_data={sys_recommend_data || []}
          res_data={filteredResData || []}
        />
      ) : (
        <p className="text-base p-2">
          You have no recommendations from your friends
        </p>
      )}
    </div>
  );
};
