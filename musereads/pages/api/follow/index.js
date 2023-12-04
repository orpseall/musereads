import { db_models } from "@/db/models/db.model";
const { User, Follower } = db_models;

async function AddFollower(req, res) {
  const { userAccountId, followingId } = req.body;
  console.log(req.body, "-ddg");
  Follower.findAll({ where: { userAccountId, followingId } }).then((user) => {
    if (user.length > 0) {
      console.log("already following!", user);
      return res
        .status(409)
        .send(JSON.stringify({ err: "Already Following user!" }));
    } else {
      Follower.create(req.body)
        .then((user) => {
          res.status(200).send(JSON.stringify(user));
        })
        .catch((err) => {
          console.log(err, "error Here create follower/following");
        });
    }
  }).catch = (err) => console.log(err);
}

const getFollowings = async (req, res) => {
  try {
    const { userAccountId } = req.query;
    const convertToInt = parseInt(userAccountId);
    const followings = await Follower.findAll({
      where: { userAccountId: convertToInt }, // Replace with the current user ID
    });
    if (followings && followings.length > 0)
      return res.status(200).send(followings);
  } catch (error) {}
};

export default function handler(req, res) {
  if (req.method === "POST") return AddFollower(req, res);
  if (req.method === "GET") return getFollowings(req, res);
}
