import { useSession } from "next-auth/react";
import BookCard from "./BookCard";

export const RecommendedBooks = ({ res_data, sys_recommend_data }) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex overflow-x-auto gap-5  py-2">
      {res_data.length > 0 &&
        res_data.map(({ books }, index) => (
          <div className="flex flex-col  min-h-[15rem] p-3">
            <BookCard
              key={index}
              book={books}
              session={status === "authenticated" ? session : null}
            />
          </div>
        ))}
      {sys_recommend_data.length > 0 &&
        sys_recommend_data.map((book, index) => (
          <div className="flex bg-museWhite flex-col  min-h-[15rem] p-3">
            <BookCard key={index} book={book} />
          </div>
        ))}
    </div>
  );
};
