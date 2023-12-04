import { db_models } from "@/db/models/db.model";
const { User, Author, AuthorBooks, Follower, UserRecommend, Book } = db_models;

async function AddRecommendation(req, res) {
  const { userAccountId, targerUserId, bookId } = req.body;
  UserRecommend.findAll({
    where: { userAccountId, targerUserId, bookId },
  }).then((user) => {
    if (user.length > 0) {
      return res
        .status(409)
        .send(JSON.stringify({ err: "Already recommended user!" }));
    } else {
      UserRecommend.create(req.body)
        .then((user) => {
          res.status(200).send(JSON.stringify(user));
        })
        .catch((err) => {
          console.log(err, "error Here create recommendation");
        });
    }
  }).catch = (err) => console.log(err);
}

const getRecommendations = async (req, res) => {
  try {
    const { userAccountId } = req.query;
    const convertToInt = parseInt(userAccountId);
    const user_recommend = await UserRecommend.findAll({
      where: { targerUserId: convertToInt },
      include: [
        {
          model: User,
          as: "users",
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
          ],
        },
      ],
    });
    if (user_recommend && user_recommend.length > 0)
      return res.status(200).send(user_recommend);
    return res.status(200).send([]);
  } catch (error) {}
};

export default function handler(req, res) {
  if (req.method === "POST") return AddRecommendation(req, res);
  if (req.method === "GET") return getRecommendations(req, res);
}
