import { db_models } from "@/db/models/db.model";

const { Genre } = db_models;

const getData = async (req, res) => {
  try {
    const all_genre = await Genre.findAll();
    if (all_genre.length > 0) return res.status(200).send(all_genre);
    return res.status(409).send([]);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRecord = async (req, res) => {
  try {
    if (req) {
      const { title } = req.body;
      console.log(req.body, "body -req");
      Genre.findAll({
        where: {
          title,
        },
      }).then((genre) => {
        if (genre.length > 0)
          return res
            .status(409)
            .send(JSON.stringify({ err: "Resource not (Item may exist)" }));
        Genre.create(req.body)
          .then((item) => {
            res.status(200).send(JSON.stringify(item));
          })
          .catch((err) => {});
      }).catch = (err) => res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export default async function handler(req, res) {
  const { method } = req;
  // read items
  if (method === "GET") return getData(req, res);
  // create item
  if (method === "POST") return createRecord(req, res);
}
