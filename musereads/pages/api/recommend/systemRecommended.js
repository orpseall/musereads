import { db_models } from "@/db/models/db.model";
const {
  User,
  Author,
  Genre,
  AuthorBooks,
  Follower,
  UserReading,
  Book,
  BookGenre,
  BuyLinks,
} = db_models;

const getUserReadings = async (req, res) => {
  try {
    const { userAccountId } = req.query;
    const convertToInt = parseInt(userAccountId);
    console.log(convertToInt, " --d");
    const userBooks = await UserReading.findAll({
      where: {
        userAccountId: convertToInt,
      },
      include: [
        {
          model: User,
          as: "user_accounts",
          attributes: ["fullname", "email", "id"],
        },
        {
          model: Book,
          as: "books",
          include: [
            {
              model: Author,
              as: "authors",
              attributes: ["id", "fullname"],
              through: {
                model: AuthorBooks,
                attributes: ["bookId", "authorId"],
              },
            },
            {
              model: Genre,
              as: "genres",
              through: {
                model: BookGenre,
              },
            },
          ],
        },
      ],
    });
    if (userBooks && userBooks.length > 0) return userBooks;
    return [];
  } catch (error) {}
};

const BooksWithSameGenre = async (filteredGenre) => {
  const Books = await BookGenre.findAll({
    where: {
      genreId: filteredGenre,
    },
  });
  if (Books && Books.length > 0) return Books;
};

const getRecommendedBook = async (uniqueBooks) => {
  const booksArray = await uniqueBooks.map(
    (unique_book, index) => unique_book.bookId
  );
  const getBooks = await Book.findAll({
    where: {
      id: booksArray,
    },
    include: [
      {
        model: Genre,
        as: "genres",
        attributes: ["id", "title"],
        through: {
          model: BookGenre,
          attributes: ["bookId", "genreId"],
        },
      },
      {
        model: Author,
        as: "authors",
        attributes: ["id", "fullname"],
        through: {
          model: AuthorBooks,
          attributes: ["bookId", "authorId"],
        },
      },
      {
        model: BuyLinks,
        as: "buylinks",
        attributes: ["id", "title", "url"],
      },
      {
        model: UserReading,
        as: "user_readings",
        attributes: [
          "id",
          "bookId",
          "userAccountId",
          "done_reading",
          "wish_to_read",
          "pageReached",
          "createdAt",
        ],
      },
    ],
  });
  if (getBooks && getBooks.length > 0) return getBooks;
};

const getSystemRecommendation = async (req, res) => {
  try {
    const userBooks = await getUserReadings(req, res);

    if (userBooks && userBooks.length > 0) {
      //  Filter books based on done_reading or wish_to_read
      const filteredUserBooks = userBooks.filter(
        (book) =>
          book.done_reading === 1 ||
          book.wish_to_read === 1 ||
          book.pageReached > 0
      );

      // Extract bookIds from filtered books
      const bookIds =
        filteredUserBooks.length > 0
          ? filteredUserBooks.map((book) => book.bookId)
          : [];

      //  Get genreIds from the BookGenre table for the extracted bookIds
      if (bookIds && bookIds.length > 0) {
        const bookGenreRecords = await BookGenre.findAll({
          attributes: ["genreId"],
          where: {
            bookId: bookIds,
          },
        });

        // Extract unique genreIds
        const uniqueGenreIds = [
          ...new Set(bookGenreRecords.map((record) => record.genreId)),
        ];

        //  Use BooksWithSameGenre to fetch books with the same genreIds
        const booksWithSameGenre = await BooksWithSameGenre(uniqueGenreIds);
        //  Remove books that the user is already engaged with
        const uniqueBooks = booksWithSameGenre.filter(
          (book) => !bookIds.includes(book.bookId)
        );

        // Get the recommended books data using their IDs
        const recommendedBookData = await getRecommendedBook(uniqueBooks);
        // Finally, send the response
        if (recommendedBookData && recommendedBookData.length > 0)
          return res.status(200).send(recommendedBookData);
        return res.status(200).send([]);
      }
      return res.status(200).send([]);
    }
    return res.status(200).send([]);
  } catch (error) {
    console.error("Error in getSystemRecommendation:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// const getSystemRecommendation = async (req, res) => {
//   try {
//     const userBooks = await getUserReadings(req, res);

//     if (userBooks && userBooks.length > 0) {
//       //  Filter books based on done_reading or wish_to_read
//       const filteredUserBooks = userBooks.filter(
//         (book) =>
//           book.done_reading === 1 ||
//           book.wish_to_read === 1 ||
//           book.pageReached > 0
//       );

//       // Extract bookIds from filtered books
//       const bookIds =
//         filteredUserBooks.length > 0
//           ? filteredUserBooks.map((book) => book.bookId)
//           : [];

//       //  Get genreIds from the BookGenre table for the extracted bookIds
//       if (bookIds && bookIds.length > 0) {
//         const bookGenreRecords = await BookGenre.findAll({
//           attributes: ["genreId"],
//           where: {
//             bookId: bookIds,
//           },
//         });

//         // Extract unique genreIds
//         const uniqueGenreIds = [
//           ...new Set(bookGenreRecords.map((record) => record.genreId)),
//         ];

//         //  Use BooksWithSameGenre to fetch books with the same genreIds
//         const booksWithSameGenre = await BooksWithSameGenre(uniqueGenreIds);
//         //  Remove books that user already is enaged with
//         const uniqueBooks = booksWithSameGenre.filter((book) =>
//           bookIds.includes(book.bookId)
//         );

//         // Get the recommended books data using their IDs
//         const Recommended_Book_data = await getRecommendedBook(uniqueBooks);
//         // Finally, send the response
//         if (Recommended_Book_data && Recommended_Book_data.length > 0)
//           return res.status(200).send(Recommended_Book_data);
//         return res.status(200).send([]);
//       }
//       return res.status(200).send([]);
//     }
//     return res.status(200).send([]);
//   } catch (error) {
//     console.error("Error in getSystemRecommendation:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };

export default async function handler(req, res) {
  if (req.method === "GET") return await getSystemRecommendation(req, res);
}
