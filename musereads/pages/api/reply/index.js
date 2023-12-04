import { db_models } from "@/db/models/db.model";
const { Comment, User, Reply, UserLikes, Book } = db_models;

const AddComment = async (req, res) => {
  try {
    const comment_created = await Reply.create(req.body);
    if (comment_created) {
      return res.status(200).send(JSON.stringify({ msg: "reply Addedd" }));
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getAllComments = async (req, res) => {
  const commentData = await Reply.findAll({
    include: [
      {
        model: User,
        as: "user_accounts",
        attributes: ["id", "fullname", "email"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "commentId", "userAccountId"],
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
