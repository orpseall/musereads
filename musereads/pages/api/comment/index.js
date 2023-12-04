import { db_models } from "@/db/models/db.model";
const { Comment, User, UserLikes, Book, Reply } = db_models;

const AddComment = async (req, res) => {
  try {
    const comment_created = await Comment.create(req.body);
    if (comment_created) {
      return res.status(200).send(JSON.stringify({ msg: "Book Addedd" }));
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getAllComments = async (req, res) => {
  const commentData = await Comment.findAll({
    include: [
      {
        model: User,
        as: "user_accounts",
        attributes: ["id", "fullname", "email"],
      },
      {
        model: Book,
        as: "books",
        attributes: ["id", "title", "imgUrl", "description", "pages"],
      },
    ],
  });
  if (commentData) return res.status(200).send(commentData);
  return res.status(404).send({ msg: "No book found" });
};

export default async function handler(req, res) {
  const { method } = req;
  // add item
  if (req.method === "POST") return AddComment(req, res);

  // read items
  if (method === "GET") return getAllComments(req, res);
}
