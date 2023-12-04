import { db_models } from "@/db/models/db.model";
const { Genre, UserReading, Book, BookGenre, AuthorBooks, Author, BuyLinks } =
  db_models;

const AddBook = async (req, res) => {
  try {
    const { book, genreIds, authorIds } = req.body;
    const book_results = await Book.create(book);
    if (book_results) {
      const { id } = book_results;
      const bookGenres = await genreIds.map((genreId) => ({
        bookId: id,
        genreId,
      }));
      const bookAuthors = await authorIds.map((authorId) => ({
        bookId: id,
        authorId,
      }));

      const book_genre_results = await BookGenre.bulkCreate(bookGenres);
      const book_author_results = await AuthorBooks.bulkCreate(bookAuthors);
      if (book_genre_results && book_author_results) {
        return res.status(200).send(JSON.stringify({ msg: "Book Addedd" }));
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

// const getGenre = async (res) => {
//   try {
//     const genreData = await Genre.findAll();
//     if (genreData.length > 0) return genreData;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllBooks = async (req, res) => {
  const bookData = await Book.findAll({
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
  if (bookData) return res.status(200).send(bookData);
  return res.status(404).send({ msg: "No book found" });
};

export default async function handler(req, res) {
  const { method } = req;
  // add item
  if (req.method === "POST") return AddBook(req, res);

  // read items
  if (method === "GET") return getAllBooks(req, res);
}
