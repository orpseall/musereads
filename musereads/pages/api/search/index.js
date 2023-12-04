import { getserver } from "@/db/config";
import { db_models } from "@/db/models/db.model";
import axios from "axios";
const { User, BookRatings, Author, AuthorBooks, Book, BookGenre, Genre } =
  db_models;

// const searchItem = async ({ req, res, SearchTxt }) => {
//   try {
//     let txtUppercase = SearchTxt.toUpperCase();
//     let book_arr = await getBook({ res });
//     let result = [];
//     book_arr.map((element, index) => {
//       const { authors, title } = element;
//       authors.map()
//       let Upper_category = authors.toUpperCase();
//       let Upper_title = title.toUpperCase();
//       if (
//         Upper_category.search(txtUppercase) > -1 ||
//         Upper_title.search(txtUppercase) > -1
//       )
//         return result.push(element);
//     });
//     if (result) res.status(200).send({ results: result });
//   } catch (error) {
//     res.send("Oops! something went wrong (product search)");
//   }
// };

// const searchItem = async ({ req, res }) => {
//   try {
//     const { SearchTxt } = req.query;
//     let txtUppercase = SearchTxt.toUpperCase();
//     console.log(txtUppercase, req.query, " odps");
//     let book_arr = await getBook({ res });
//     let result = [];

//     book_arr.map((element, index) => {
//       const { authors, title } = element;
//       authors.map((author) => {
//         let Upper_author = author.fullname.toUpperCase();
//         if (Upper_author.search(txtUppercase) > -1) {
//           return result.push(element);
//         }
//       });

//       let UpperAuthors = authors.toUpperCase();
//       let Upper_title = title.toUpperCase();
//       if (
//         UpperAuthors.search(txtUppercase) > -1 ||
//         Upper_title.search(txtUppercase) > -1
//       ) {
//         return result.push(element);
//       }
//     });

//     if (result) res.status(200).send({ results: result });
//   } catch (error) {
//     res.send("Oops! something went wrong (product search)");
//   }
// };

const searchItem = async ({ req, res }) => {
  try {
    // Extract the search term from the query parameters
    const { SearchTxt } = req.query;

    // Convert the search term to uppercase for case-insensitive search
    const searchTermUppercase = SearchTxt.toUpperCase();
    // Santize search query example if "There's in entered by user the query will be Thers%27s which when sanitized will be There's"
    const sanitizedSearchTerm = encodeURIComponent(searchTermUppercase);

    // Retrieve the book data
    const bookArr = await getBook({ res });

    // Initialize an empty array to store the search results
    const results = [];

    // Iterate through each book in the book array
    if (bookArr) {
      bookArr.length > 0 &&
        bookArr.map((book) => {
          const { authors, title } = book;

          // Check if any author's name contains the search term
          const authorMatch = authors.some((author) => {
            const authorUppercase = author.fullname.toUpperCase();
            return authorUppercase.search(sanitizedSearchTerm) > -1;
          });

          // Check if the book title contains the search term
          const titleMatch =
            title.toUpperCase().search(sanitizedSearchTerm) > -1;

          // If either the author's name or the book title matches the search term, add the book to the results array
          if (authorMatch || titleMatch) {
            results.push(book);
          }
        });
    }
    // Send the search results as a response
    if (results.length > 0) {
      res.status(200).send({ results });
    } else {
      res.status(404).send({ message: "No matching books found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getBook = async ({ res }) => {
  try {
    let results = await axios.get(`${getserver}/api/book`);
    if (results.status === 200) return results.data;
  } catch (error) {
    res.send("Oops! something is missing. Reload Page!");
  }
};

// const getSearch = async (req, res) => {
//   try {
//     const { SearchTxt, modeltype } = req.body;
//     if (modeltype === "product") return
//     if (modeltype === "post") return searchPost({ req, res, SearchTxt });
//   } catch (error) {
//     res.send("unable to fetch all categories..");
//   }
// };

export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") return searchItem({ req, res });
}
