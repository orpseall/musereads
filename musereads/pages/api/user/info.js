import { db_models } from "@/db/models/db.model";
const { User, Follower } = db_models;

const getUser = async (req, res) => {
  try {
    const user_results = await User.findAll({
      attributes: ["id", "fullname", "email", "role"],
      include: [
        {
          model: Follower,
          as: "followers",
          attributes: ["id", "followingId", "userAccountId"],
          include: [
            {
              model: User,
              as: "userAccount",
              attributes: ["id", "fullname", "email"],
            },
          ],
        },
      ],
    });
    if (user_results) {
      console.log(user_results, " x----d");
      return res.status(200).send(user_results);
    }
    return res.status(404).send({ msg: "No user found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") return getUser(req, res);
}
