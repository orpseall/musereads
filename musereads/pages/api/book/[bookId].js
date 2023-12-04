import { db_models } from "@/db/models/db.model";

const {
  Book,
  BookGenre,
  BookRatings,
  Genre,
  AuthorBooks,
  Author,
  BuyLinks,
  User,
  Comment,
  UserReading,
  Reply,
} = db_models;

const getData = async ({ bookId, res }) => {
  try {
    const converted_id = parseInt(bookId);
    const readItem = await Book.findAll({
      where: {
        id: converted_id,
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
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "userAccountId", "bookId", "comment", "createdAt"],
          include: [
            {
              model: User,
              as: "user_accounts",
              attributes: ["id", "fullname", "email"],
            },
            {
              model: Reply,
              as: "replies",
              attributes: [
                "id",
                "userAccountId",
                "commentId",
                "reply",
                "createdAt",
              ],
              include: [
                {
                  model: User,
                  as: "user_accounts",
                  attributes: ["id", "fullname", "email"],
                },
              ],
            },
          ],
        },
      ],
    });
    if (readItem.length > 0) {
      return res.status(200).send(readItem);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default async function handler(req, res) {
  const { method } = req;
  const { bookId } = req.query;

  // read item
  if (method === "GET") return getData({ bookId, res });

  // update item

  // if (method === "PUT") {
  //     try {
  //         const updateItem = await Account.findBy_idAndUpdate(_id, { $set: req.body }, { new: true });
  //         return res.status(200).json(updateItem);
  //     } catch (err) {
  //         res.status(400).json(err);
  //     }
  // }

  // delete item

  // if (method === "DELETE") {
  //     try {
  //         const deleteItem = await Account.findBy_idAndDelete(_id);
  //         res.status(200).json(deleteItem);
  //     } catch (err) {
  //         res.status(500).json(err);
  //     }
  // }
}
